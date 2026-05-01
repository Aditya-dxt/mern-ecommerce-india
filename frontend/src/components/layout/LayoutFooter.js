'use client';
import { usePathname } from 'next/navigation';
import Footer from '@/components/layout/Footer';

const noFooterPaths = ['/auth/login', '/auth/signup', '/'];

export default function LayoutFooter() {
  const pathname = usePathname();
  
  if (noFooterPaths.includes(pathname)) {
    return null;
  }
  
  return <Footer />;
}
