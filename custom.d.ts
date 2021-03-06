type User = {
  id: number;
  username: string;
  createdAt?: string;
  updatedAt?: string;

}
type Post = {
  id: number;
  date: string;
  title: string;
  content?: string;
  images: string;
  category: string;
  views: number;
  htmlContent?: string;
  createdAt?: string;
  updatedAt?: string;
  author?: User
}
type Category = {
  id: number;
  name: string;
}

declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.jpg' {
  const value: string;
  export default value;
}
