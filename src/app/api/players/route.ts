/* eslint-disable import/prefer-default-export */
// export async default로 하니까 안 됨.
import { NextResponse } from 'next/server';

import prisma from '@libs/prismadb';

export async function GET(request: Request) {
  try {
    const club = new URL(request.url).searchParams.get('club');
    const data = await prisma!.player.findMany({
      where: {
        club: club!,
      },
    });
    return NextResponse.json(data);
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
