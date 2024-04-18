/* eslint-disable import/prefer-default-export */
import { NextResponse } from 'next/server';

import getCurrentUser from '@actions/getCurrentUser';
import prisma from '@libs/prismadb';

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;
    const userId = new URL(request.url).searchParams.get('userId') ?? undefined;

    const like = await prisma?.like.count({
      where: {
        postId: +id,
      },
    });

    let clicked = null;
    let getUserId = null;
    if (userId) {
      getUserId = userId;
    } else {
      const currentUser = await getCurrentUser();
      getUserId = currentUser?.id;
    }
    if (getUserId) {
      clicked = await prisma?.like.findFirst({
        where: {
          postId: +id,
          userId: getUserId,
        },
      });
    }

    const data = {
      like,
      clicked: !!clicked,
    };
    return NextResponse.json(data);
  } catch (error) {
    return new NextResponse('Error', { status: 500 });
  }
}
