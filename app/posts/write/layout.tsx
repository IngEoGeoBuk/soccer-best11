'use client';

import React from 'react';
import { PostProvider } from '@/app/context/post.provider';

export const metadata = {
  title: 'Soccer best 11',
  description: 'Generate your best team!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PostProvider>{children}</PostProvider>
  );
}
