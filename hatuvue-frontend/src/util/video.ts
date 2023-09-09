export interface Video {
  id: number;
  name: string;
  description: string;
  uploadat: Date;
  author: string;
  filename: string;
  like: number[];
  dislike: number[];
  view: number;
}
