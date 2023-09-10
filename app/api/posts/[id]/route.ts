/* eslint-disable import/prefer-default-export */
// export async default로 하니까 안 됨.
import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';

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

    const players: any[] = [];
    for (let i = 0; i < data!.postPlayers.length; i += 1) {
      players.push(prisma!.player.findUnique({
        where: {
          id: +data!.postPlayers[i].playerId,
        },
      }));
    }

    return NextResponse.json({
      id: data?.id,
      userId: data?.userId,
      title: data?.title,
      description: data?.description,
      createdAt: data?.createdAt,
      updatedAt: data?.updatedAt,
      email: data?.user.email,
      players: await Promise.all(players),
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

    await prisma!.postPlayer.deleteMany({
      where: {
        postId: +id,
      },
    });
    const postPlayerData = body.playerIds.map((item: number) => ({
      postId: post.id,
      playerId: item,
    }));
    const postPlayer = await prisma!.postPlayer.createMany({
      data: postPlayerData, skipDuplicates: true,
    });

    return NextResponse.json({
      post, postPlayer,
    });
  } catch (error) {
    return new NextResponse('Error', { status: 500 });
  }
}
