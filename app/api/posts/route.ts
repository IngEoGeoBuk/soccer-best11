/* eslint-disable import/prefer-default-export */
// export async default로 하니까 안 됨.
import { NextResponse } from 'next/server';

import prisma from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';

export async function GET(
  request: Request,
) {
  try {
    const currentUser = await getCurrentUser();

    // const perPage = 10;
    // const paginatedList = 5;
    // const page = Number(new URL(request.url).searchParams.get('page'));
    const type = new URL(request.url).searchParams.get('type');

    if (type === 'my' && !currentUser) {
      return NextResponse.error();
    }

    const post = await prisma!.post.findMany();

    return NextResponse.json({
      post,
    });
  } catch (error) {
    return new NextResponse('Error', { status: 500 });
  }
}

export async function POST(
  request: Request,
) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    const body = await request.json();
    const post = await prisma!.post.create({
      data: {
        userId: currentUser.id,
        email: currentUser.email,
        title: body.title.substring(0, 30),
        description: body.title.substring(0, 300),
        createdAt: new Date(),
        updatedAt: null,
        ...body,
      },
    });
    return NextResponse.json(post);
  } catch (error) {
    return new NextResponse('Error', { status: 500 });
  }
}
