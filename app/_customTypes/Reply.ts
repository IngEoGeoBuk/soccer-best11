import { Reply } from '@prisma/client';

export interface ViewReply extends Reply {
  email: string;
}
