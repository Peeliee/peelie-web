const PATH = {
  HOME: '/',
  LOGIN: '/login',
  ONBOARDING: '/onboarding',
  FRIENDS: '/friends',
  FRIEND: (id: string) => `/friend/${id}`,
  TEST: '/test',
  TESTID: (id: string) => `/test/${id}`,
  CHAT_ROOM: '/chat-room',
};

export default PATH;
