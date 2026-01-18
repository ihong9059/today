import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "./contexts/AuthContext";
import Header from "./components/Header";

export const metadata: Metadata = {
  title: "자격시험 가이드 | 분야별 자격증 정보",
  description: "한국 자격시험 정보를 분야별로 제공합니다. AI 학습 가이드, 시험 일정, 합격 전략을 확인하세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
