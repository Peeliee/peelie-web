import { useState } from 'react';

import type { ChatListItem } from '@/entities/chatroom';

type BlockReason = 'withdrawn' | 'unfriended';

interface UseChatGuardParams {
  currentRoom: ChatListItem | undefined;
  send: (text: string) => void;
}

export function useChatGuard({ currentRoom, send }: UseChatGuardParams) {
  const [modalOpen, setModalOpen] = useState(false);

  const blockReason: BlockReason | null = currentRoom?.friend.isWithdrawn
    ? 'withdrawn'
    : currentRoom && !currentRoom.friend.isFriend
      ? 'unfriended'
      : null;

  const isBlocked = blockReason !== null;

  const guardedSend = (text: string) => {
    if (isBlocked) {
      setModalOpen(true);
      return;
    }
    send(text);
  };

  return {
    isBlocked,
    blockReason,
    guardedSend,
    modalOpen,
    closeModal: () => setModalOpen(false),
  };
}
