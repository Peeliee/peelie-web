export type Meet = {
  id: string;
  date: string;
  title: string;
  friend: {
    id: string;
    name: string;
    type: string;
  };
};
