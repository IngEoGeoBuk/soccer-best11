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
    const reply = await prisma?.reply.delete({
      where: {
        id: +id,
      },
    });
    return NextResponse.json(reply);
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
    const reply = await prisma!.reply.update({
      data: {
        content: body.content.substring(0, 100),
        ...body,
      },
      where: {
        id: +id,
      },
    });
    return NextResponse.json(reply);
  } catch (error) {
    return new NextResponse('Error', { status: 500 });
  }
}
