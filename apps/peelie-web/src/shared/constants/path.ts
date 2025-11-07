const PATH = {
  HOME: '/',
  FRIENDS: '/friends',
  FRIEND: (id: string) => `/friend/${id}`,
  TEST: '/test',
  TESTID: (id: string) => `/test/${id}`,
};

export default PATH;
