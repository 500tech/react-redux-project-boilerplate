export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export type PostsMap = Record<string, Post>;
