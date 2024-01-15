/* eslint-disable import/prefer-default-export */
// export async default로 하니까 안 됨.
import { NextResponse } from 'next/server';

import { Prisma } from '@prisma/client';

import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';
import { ChangedPlayer } from '@/app/types/Post';

// request 안 쓰여도 선언해야 함. 지우면 에러 남.
export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;
    const data = await prisma!.post.findUnique({
      where: {
        id: +id,
      },
      include: {
        user: true,
        postPlayers: true,
      },
    });

    const postPlayerIdList: number[] = data!.postPlayers.map((item) => item.id);
    // https://stackoverflow.com/questions/68418224/prisma-queryraw-with-variable-length-parameter-list
    const players = await prisma!.$queryRaw`
      SELECT o.id as "postPlayerId", o."playerId" as id, p.name, p.nationality, p.club
      FROM "PostPlayer" o
      LEFT JOIN "Player" p ON p.id = o."playerId"
      WHERE o.id IN (${Prisma.join(postPlayerIdList)})
      ORDER BY o.id
    `;

    return NextResponse.json({
      id: data?.id,
      userId: data?.userId,
      title: data?.title,
      description: data?.description,
      createdAt: data?.createdAt,
      updatedAt: data?.updatedAt,
      email: data?.user.email,
      players,
    });
  } catch (error) {
    return new NextResponse('Error', { status: 500 });
  }
}

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
    const post = await prisma?.post.delete({
      where: {
        id: +id,
      },
    });
    return NextResponse.json(post);
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
    const post = await prisma!.post.update({
      data: {
        title: body.title.substring(0, 30),
        description: body.description.substring(0, 300),
      },
      where: {
        id: +id,
      },
    });

    const players = body.changedPlayers.map(async (item: ChangedPlayer) => {
      await prisma!.postPlayer.update({
        data: {
          playerId: +item.changedId,
        },
        where: {
          id: +item.postPlayerId,
        },
      });
    });

    return NextResponse.json({
      post,
      players,
    });
  } catch (error) {
    return new NextResponse('Error', { status: 500 });
  }
}
