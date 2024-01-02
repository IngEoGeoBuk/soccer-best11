/* eslint-disable no-underscore-dangle */
/* eslint-disable import/prefer-default-export */
import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';

// request 안 쓰여도 선언해야 함. 지우면 에러 남.
export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;
    const perQuery = 5;
    const replyId = Number(new URL(request.url).searchParams.get('replyId'));

    const data = await prisma!.reply.findMany({
      where: {
        commentId: +id,
      },
      include: {
        user: true,
      },
      take: perQuery,
      skip: replyId ? 1 : 0,
      ...(replyId && { cursor: { id: replyId } }),
      orderBy: [
        {
          createdAt: 'asc',
        },
      ],
    });

    return NextResponse.json({
      data: data.map((item) => ({ ...item, email: item.user.email })),
      nextLastId: data.length === perQuery ? data[data.length - 1].id : undefined,
    });
  } catch (error) {
    return new NextResponse('Error', { status: 500 });
  }
}
