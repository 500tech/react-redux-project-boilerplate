export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}
export interface PostsMap {
  [key: number]: Post;
}
