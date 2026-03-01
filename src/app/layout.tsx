import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "(주)진양산업 - 정밀 프레스 가공 전문기업",
  description:
    "Tier 2 자동차 부품 전문기업 진양산업. 30년 이상의 경험과 최신 자동화 설비로 최고 품질의 금속 프레스 부품을 공급합니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
