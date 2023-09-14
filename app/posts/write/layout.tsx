'use client';

import React from 'react';
import { PostProvider } from '@/app/context/post-context';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PostProvider>{children}</PostProvider>
  );
}
