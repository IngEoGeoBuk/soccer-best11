/* eslint-disable import/prefer-default-export */
import { NextResponse } from 'next/server';

import getCurrentUser from '@actions/getCurrentUser';
import prisma from '@libs/prismadb';

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    const data = await request.json();
    const like = await prisma!.like.create({
      data: {
        userId: currentUser.id,
        ...data,
      },
    });
    return NextResponse.json(like);
  } catch (error) {
    return new NextResponse('Error', { status: 500 });
  }
}
