'use client';

import React, { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';

interface ParentComponentProps {
  children: ReactNode;
}

function AuthProvider({ children }: ParentComponentProps) {
  return <SessionProvider>{children}</SessionProvider>;
}

export default AuthProvider;
