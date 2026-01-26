import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

/**
 * Socket.IO singleton
 *
 * TODO:
 * - Server ↔ Client event DTO 연결
 * - Typed events (ServerToClient / ClientToServer)
 * - Web / RN 공통 payload 정의
 */

export function getSocket() {
  if (socket) return socket;

  socket = io(import.meta.env.VITE_SOCKET_URL ?? 'http://localhost:5173', {
    transports: ['websocket'],
    autoConnect: false, // 중요
  });

  // 최소 필수 로깅
  socket.on('connect', () => {
    console.log('[socket] connected', socket?.id);
  });

  socket.on('disconnect', (reason) => {
    console.log('[socket] disconnected', reason);
  });

  socket.on('connect_error', (err) => {
    console.log('[socket] connect_error', err.message);
  });

  return socket;
}
