import { Post } from '@prisma/client';

export interface CreatePost {
  title: string;
  description: string;
  playerIds: number[];
}

export interface ViewPostList {
  id: number;
  email: string;
  image: string;
  title: string;
  createdAt: string;
  likes: number;
}

export interface PostLike extends Post {
  likes: number;
}
