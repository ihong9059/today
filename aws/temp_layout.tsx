import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AI 기반 진로교육 플랫폼 - UTTEC Edu',
  description: 'AI와 함께 다양한 직업을 간접 경험하고, 나에게 맞는 진로를 찾아 실무 역량까지 갖추세요! 학부형, 사회초년생, 진로전환자를 위한 맞춤형 교육',
  keywords: ['AI', '진로교육', 'MBTI', '직업탐색', '포트폴리오', '취업', '학부형', '사회초년생'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
          {children}
        </div>
      </body>
    </html>
  );
}
