import type { Metadata } from 'next';
import '@fontsource/noto-sans-kr/400.css';
import '@fontsource/noto-sans-kr/700.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'lukelingo — Korean Practice',
  description: 'Korean vocabulary flashcard app with TTS pronunciation',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="antialiased">{children}</body>
    </html>
  );
}
