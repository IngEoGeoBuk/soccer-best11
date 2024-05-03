'use client';

import { useState, useEffect } from 'react';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';

import { useQueryClient } from '@tanstack/react-query';

import { HeaderUser } from '@customTypes/HeaderUser';

import Aside from './components/aside';
import NavHeader from './components/navHeader';

import './header.css';

function Header({ user }: { user: HeaderUser }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const isHome = pathname === '/' || pathname === '/en';

  const type = searchParams.get('type') ?? '';
  const router = useRouter();
  const queryClient = useQueryClient();

  const [showAside, setShowAside] = useState<boolean>(false);

  const handleResize = () => {
    if (window.innerWidth >= 768) {
      setShowAside(false);
    }
  };

  const clickHomeLogo = async () => {
    if (isHome && !type) {
      queryClient.refetchQueries({ queryKey: ['posts'] });
    }
    router.push('/');
  };

  const clickMy = async () => {
    if (isHome && type === 'my') {
      queryClient.refetchQueries({ queryKey: ['posts'] });
    }
    router.push('/?type=my');
  };

  const clickBest = async () => {
    if (isHome && type === 'best') {
      queryClient.refetchQueries({ queryKey: ['posts'] });
    }
    router.push('/?type=best');
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <NavHeader
        user={user}
        clickHomeLogo={clickHomeLogo}
        clickMy={clickMy}
        clickBest={clickBest}
        toggleAside={() => setShowAside(!showAside)}
      />
      <Aside
        user={user}
        clickHomeLogo={clickHomeLogo}
        clickMy={clickMy}
        clickBest={clickBest}
        showAside={showAside}
        hideAside={() => setShowAside(false)}
      />
    </>
  );
}

export default Header;
