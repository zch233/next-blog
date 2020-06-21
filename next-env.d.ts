/// <reference types="next" />
/// <reference types="next/types/global" />

declare module "*.png" {
  const value: string;
  export default value
}

declare module "*.jpg" {
  const value: string;
  export default value
}

interface Post {
  id: string,
  date: string,
  content: string,
  title: string,
}