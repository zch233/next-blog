type Post = {
  id: string;
  date: string;
  title: string;
  content?: string;
  htmlContent?: string;
}

declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.jpg' {
  const value: string;
  export default value;
}
