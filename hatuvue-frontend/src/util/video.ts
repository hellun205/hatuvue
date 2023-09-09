export interface Video {
  id: number;
  name: string;
  description: string;
  uploadat: Date;
  author: string;
  fileuuid: `${string}-${string}-${string}-${string}-${string}`;
  like: number[];
  dislike: number[];
  view: number;
}
