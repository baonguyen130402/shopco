export interface DummyPost {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number;
  };
  views: number;
  userId: number;
}

export interface DummyPostsResponse {
  posts: DummyPost[];
  total: number;
  skip: number;
  limit: number;
}

export interface DummyUser {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  image: string;
}