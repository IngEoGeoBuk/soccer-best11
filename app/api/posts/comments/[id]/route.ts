/* eslint-disable import/prefer-default-export */
// export async default로 하니까 안 됨.
import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';

// request 안 쓰여도 선언해야 함. 지우면 에러 남.
export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;
    const data = await prisma!.comment.findMany({
      where: {
        postId: +id,
      },
      include: {
        user: true,
        replies: {
          include: {
            user: true,
          },
        },
      },
      orderBy: [
        {
          createdAt: 'asc',
        },
      ],
    });
    const filteredData = data.map((item) => (
      item.deletedAt
        ? {
          ...item,
          userId: '',
          email: '',
          content: '',
        }
        : {
          ...item,
          email: item.user.email,
          replies: item.replies.map((item2) => ({
            ...item2,
            email: item2.user.email,
          })),
        }
    ));
    return NextResponse.json(filteredData);
  } catch (error) {
    return new NextResponse('Error', { status: 500 });
  }
}
