import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UTTEC | Network Solution - BLE Mesh Network 전문기업",
  description:
    "㈜유티텍은 BLE Mesh Network 기반 조명제어, 주차장 무선제어, 스마트 제어 솔루션을 제공하는 네트워크 전문기업입니다.",
  keywords:
    "UTTEC, 유티텍, BLE, Mesh Network, 조명제어, 주차장, 스마트팜, Smart Factory",
  openGraph: {
    title: "UTTEC | Network Solution",
    description: "BLE Mesh Network 기반 네트워크 솔루션 전문기업",
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">{children}</body>
    </html>
  );
}
