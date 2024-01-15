import { Comment } from '@prisma/client';

export interface ViewComment extends Comment {
  email: string;
  repliesCount: number;
}
