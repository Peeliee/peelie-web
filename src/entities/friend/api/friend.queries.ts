import { createQueryKeys } from '@lukemorales/query-key-factory';

import { friendGet } from './friend-get';

export const friendQuery = createQueryKeys('friend', {
  friendList: () => ({
    queryKey: ['friendList'],
    queryFn: friendGet.friendList,
  }),

  friendProfile: (friendId: number) => ({
    queryKey: ['friendProfile', friendId],
    queryFn: friendGet.friendProfile,
  }),

  randomFriend: () => ({
    queryKey: ['randomFriend'],
    queryFn: friendGet.randomFriend,
  }),
});
