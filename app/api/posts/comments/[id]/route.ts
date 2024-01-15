/* eslint-disable no-underscore-dangle */
/* eslint-disable import/prefer-default-export */
// export async default로 하니까 안 됨.
import { NextResponse } from 'next/server';

import prisma from '@/app/_libs/prismadb';

// request 안 쓰여도 선언해야 함. 지우면 에러 남.
export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;
    const perQuery = 5;
    const commentId = Number(
      new URL(request.url).searchParams.get('commentId'),
    );

    const data = await prisma!.comment.findMany({
      where: {
        postId: +id,
      },
      include: {
        user: true,
        _count: {
          select: { replies: true },
        },
      },
      // https://velog.io/@mgk8609/Prisma%EB%A1%9C-Pagination-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0
      take: perQuery,
      skip: commentId ? 1 : 0,
      ...(commentId && { cursor: { id: commentId } }),
      orderBy: [
        {
          createdAt: 'asc',
        },
      ],
    });
    const filteredData = data.map((item) =>
      item.deletedAt
        ? {
            ...item,
            userId: '',
            content: '',
            email: '',
            repliesCount: item._count.replies,
          }
        : {
            ...item,
            email: item.user.email,
            repliesCount: item._count.replies,
          },
    );
    return NextResponse.json({
      data: filteredData,
      nextLastId:
        data.length === perQuery ? data[data.length - 1].id : undefined,
    });
  } catch (error) {
    return new NextResponse('Error', { status: 500 });
  }
}
