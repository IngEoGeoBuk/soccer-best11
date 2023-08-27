/* eslint-disable import/prefer-default-export */
// export async default로 하니까 안 됨.
import { NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';

import prisma from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';
import { ViewPostList } from '@/app/types/Post';

export async function GET(
  request: Request,
) {
  try {
    const currentUser = await getCurrentUser();

    const perPage = 10;
    const type = new URL(request.url).searchParams.get('type');
    const id = Number(new URL(request.url).searchParams.get('id'));

    if (type === 'my' && !currentUser) {
      return NextResponse.error();
    }

    const returnWhereQuery = () => {
      if (type === 'my' && id) {
        return Prisma!.sql`WHERE p.id < ${id} AND u.email = ${currentUser!.email!}`;
      }
      if (type === 'my' && !id) {
        return Prisma!.sql`WHERE u.email = ${currentUser!.email!}`;
      }
      if (!type && id) {
        return Prisma!.sql`WHERE p.id < ${id}`;
      }
      return Prisma!.sql``;
    };

    const returnHavingQuery = () => {
      if (type === 'best') {
        return Prisma!.sql`HAVING COUNT(l.id) >= 2`;
      }
      return Prisma!.sql``;
    };

    // lastPage인지 인식하기 위해 +1해서 불러줌
    const data: ViewPostList[] = await prisma!.$queryRaw`
      SELECT p.id, p.title, p."createdAt", u.email, u.image, COUNT(l.id) AS likes
      FROM "Post" p
      LEFT JOIN "User" u ON p."userId" = u.id
      LEFT JOIN "Like" l ON p.id = l."postId"
      ${returnWhereQuery()}
      GROUP BY p.id, p.title, u.email, u.image
      ${returnHavingQuery()}
      ORDER BY p."createdAt" DESC
      LIMIT ${perPage + 1}
    `;
    const post = data?.map((item) => (
      {
        ...item,
        likes: Number(item.likes),
      }
    )).slice(0, perPage);
    return NextResponse.json({
      data: post,
      nextLastId: data.length === (perPage + 1) ? post[post.length - 1].id : undefined,
    });
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
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
