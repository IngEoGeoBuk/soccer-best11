import { Post } from '@prisma/client';

export interface CreatePost {
  title: string;
  description: string;
}

export interface PostLike extends Post {
  likes: number;
}
