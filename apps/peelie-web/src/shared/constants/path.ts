const PATH = {
  HOME: '/',
  LOGIN: '/login',
  ONBOARDING: '/onboarding',
  FRIENDS: '/friends',
  FRIEND: (id: string) => `/friend/${id}`,
  CHAT_ROOM: '/chat-room',
};

export default PATH;
