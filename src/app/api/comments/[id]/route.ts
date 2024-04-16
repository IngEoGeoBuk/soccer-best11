/* eslint-disable import/prefer-default-export */
import { NextResponse } from 'next/server';

import getCurrentUser from '@actions/getCurrentUser';
import prisma from '@libs/prismadb';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.error();
    }
    const { id } = params;

    if (!id || typeof id !== 'string') {
      throw new Error('Invalid ID');
    }

    // 댓글에 답글 있을 경우 진짜 삭제가 아닌 삭제된 척 하기
    const checkReply = await prisma?.reply.findMany({
      where: {
        commentId: +id,
      },
    });
    if (checkReply?.length) {
      const comment = await prisma!.comment.update({
        data: {
          deletedAt: new Date(),
        },
        where: {
          id: +id,
        },
      });
      return NextResponse.json(comment);
    }

    const comment = await prisma?.comment.delete({
      where: {
        id: +id,
      },
    });
    return NextResponse.json(comment);
  } catch (error) {
    return new NextResponse('Error', { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.error();
    }
    const { id } = params;
    if (!id || typeof id !== 'string') {
      throw new Error('Invalid ID');
    }
    const body = await request.json();
    const comment = await prisma!.comment.update({
      data: {
        content: body.content.substring(0, 100),
        deletedAt: null,
        ...body,
      },
      where: {
        id: +id,
      },
    });
    return NextResponse.json(comment);
  } catch (error) {
    return new NextResponse('Error', { status: 500 });
  }
}
