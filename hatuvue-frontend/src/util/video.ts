export interface Video {
  id: number;
  name: string;
  description: string;
  uploadAt: Date;
  author: string;
  fileUuid: `${string}-${string}-${string}-${string}-${string}`;
  like: number[];
  disLike: number[];
}
