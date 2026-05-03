'use client';
import dynamic from 'next/dynamic';

const AuthProvider = dynamic(() => import('@/components/auth/AuthProvider').then(m => m.AuthProvider), { ssr: false });
const AppShell = dynamic(() => import('@/components/layout/AppShell'), { ssr: false });

export default function Home() {
  return (
    <AuthProvider>
      <AppShell />
    </AuthProvider>
  );
}
