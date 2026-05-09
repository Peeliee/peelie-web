import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { command, defineContract, event, request } from './define'
import {
  BridgeDisposedError,
  BridgeHandlerError,
  BridgeTimeoutError,
} from './errors'
import { createTestBridge } from './testing'

const contract = defineContract({
  GET_TOKEN: request<void, { token: string }>(),
  ECHO: request<{ msg: string }, { msg: string }>(),
  OPEN_INSTAGRAM: command<{ username: string }>(),
  PHOTO_TAKEN: event<{ uri: string }>(),
  LONG_RPC: request<void, { ok: boolean }>({ timeout: 50 }),
  NEVER_BOUND: request<void, { ok: boolean }>(),
})

// helper: queue a few microtask flushes so mock transport delivers in both directions
async function flush(): Promise<void> {
  for (let i = 0; i < 4; i++) await Promise.resolve()
}

describe('integration: web ↔ native via mock transport', () => {
  it('round-trips a request → response', async () => {
    const { web } = createTestBridge(contract, {
      GET_TOKEN: async () => ({ token: 'abc' }),
    })
    await expect(web.request('GET_TOKEN')).resolves.toEqual({ token: 'abc' })
  })

  it('passes payload through and returns handler result', async () => {
    const { web } = createTestBridge(contract, {
      ECHO: async ({ msg }) => ({ msg: msg.toUpperCase() }),
    })
    await expect(web.request('ECHO', { msg: 'hi' })).resolves.toEqual({
      msg: 'HI',
    })
  })

  it('rejects with UNKNOWN_MESSAGE when no handler is bound', async () => {
    const { web } = createTestBridge(contract, {})
    const err = await web.request('NEVER_BOUND').catch((e) => e)
    expect(err).toBeInstanceOf(BridgeHandlerError)
    expect(err.code).toBe('UNKNOWN_MESSAGE')
  })

  it('rejects with HANDLER_ERROR when handler throws', async () => {
    const { web } = createTestBridge(contract, {
      GET_TOKEN: async () => {
        throw new Error('boom')
      },
    })
    const err = await web.request('GET_TOKEN').catch((e) => e)
    expect(err).toBeInstanceOf(BridgeHandlerError)
    expect(err.code).toBe('HANDLER_ERROR')
    expect(err.detail).toBe('boom')
  })

  it('command fires without response', async () => {
    const handler = vi.fn()
    const { web } = createTestBridge(contract, {
      OPEN_INSTAGRAM: handler,
    })
    web.send('OPEN_INSTAGRAM', { username: 'peelie' })
    await flush()
    expect(handler).toHaveBeenCalledWith({ username: 'peelie' })
  })

  it('subscribes to events emitted from native', async () => {
    const { web, native } = createTestBridge(contract)
    const got = vi.fn()
    web.on('PHOTO_TAKEN', got)
    native.emit('PHOTO_TAKEN', { uri: 'file://x' })
    await flush()
    expect(got).toHaveBeenCalledWith({ uri: 'file://x' })
  })

  it('returns a cleanup function from on() that unsubscribes', async () => {
    const { web, native } = createTestBridge(contract)
    const handler = vi.fn()
    const off = web.on('PHOTO_TAKEN', handler)
    off()
    native.emit('PHOTO_TAKEN', { uri: 'file://x' })
    await flush()
    expect(handler).not.toHaveBeenCalled()
  })

  describe('timeout', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })
    afterEach(() => {
      vi.useRealTimers()
    })

    it('rejects with BridgeTimeoutError when contract timeout elapses', async () => {
      const { web } = createTestBridge(contract, {
        LONG_RPC: () => new Promise(() => {}),
      })
      const p = web.request('LONG_RPC')
      vi.advanceTimersByTime(100)
      await expect(p).rejects.toBeInstanceOf(BridgeTimeoutError)
    })
  })

  it('dispose rejects pending requests with BridgeDisposedError', async () => {
    const { web } = createTestBridge(contract, {
      LONG_RPC: () => new Promise(() => {}),
    })
    const p = web.request('LONG_RPC')
    web.dispose()
    await expect(p).rejects.toBeInstanceOf(BridgeDisposedError)
  })

  it('dispose blocks subsequent requests', async () => {
    const { web } = createTestBridge(contract, {
      GET_TOKEN: async () => ({ token: 'x' }),
    })
    web.dispose()
    await expect(web.request('GET_TOKEN')).rejects.toBeInstanceOf(
      BridgeDisposedError,
    )
  })
})
