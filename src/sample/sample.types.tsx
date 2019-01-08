export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}
export type Posts = Array<Post>;
export interface PostsMap {
  [key: number]: Post;
}
