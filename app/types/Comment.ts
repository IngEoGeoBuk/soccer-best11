import { Comment } from '@prisma/client';
import { ViewReply } from './Reply';

export interface ViewComment extends Comment {
  email: string;
  replies: ViewReply[];
}
