import type { Metadata } from 'next';
import '@fontsource/noto-sans-kr/400.css';
import '@fontsource/noto-sans-kr/700.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'lukelingo',
  description: 'Korean vocabulary practice with flashcards and TTS',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
