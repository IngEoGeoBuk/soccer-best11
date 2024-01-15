/* eslint-disable import/prefer-default-export */
// export async default로 하니까 안 됨.
import { NextResponse } from 'next/server';

import { Prisma } from '@prisma/client';

import getCurrentUser from '@/app/_actions/getCurrentUser';
import prisma from '@/app/_libs/prismadb';
import { ViewPostList } from '@/app/_types/Post';

export async function GET(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    const perPage = 10;
    const type = new URL(request.url).searchParams.get('type');
    const id = Number(new URL(request.url).searchParams.get('id'));
    const search = new URL(request.url).searchParams.get('search')
      ? `%${new URL(request.url).searchParams.get('search')}%`
      : '';

    if (type === 'my' && !currentUser) {
      return new NextResponse('There is no login', { status: 404 });
    }

    const returnWhereQuery = () => {
      const searchQuery = search
        ? Prisma!.sql`AND p.title ILIKE ${search}`
        : Prisma.empty;
      const typeQuery =
        type === 'my'
          ? Prisma!.sql`AND u.email = ${currentUser!.email!}`
          : Prisma.empty;
      const idQuery = id ? Prisma!.sql`AND p.id < ${id}` : Prisma.empty;
      return Prisma!
        .sql`WHERE p.id IS NOT NULL ${searchQuery} ${typeQuery} ${idQuery}`;
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
    const post = data
      ?.map((item) => ({
        ...item,
        likes: Number(item.likes),
      }))
      .slice(0, perPage);
    return NextResponse.json({
      data: post,
      nextLastId:
        data.length === perPage + 1 ? post[post.length - 1].id : undefined,
    });
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function POST(request: Request) {
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
        description: body.description.substring(0, 300),
        createdAt: new Date(),
        updatedAt: null,
      },
    });

    const postPlayerData = body.playerIds.map((item: number) => ({
      postId: post.id,
      playerId: item,
    }));
    const postPlayer = await prisma!.postPlayer.createMany({
      data: postPlayerData,
      skipDuplicates: true,
    });
    return NextResponse.json({
      post,
      postPlayer,
    });
  } catch (error) {
    return new NextResponse('Error', { status: 500 });
  }
}
