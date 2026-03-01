"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { notices } from "@/data/notices";

const PER_PAGE = 5;

function isNew(dateStr: string) {
  const d = new Date(dateStr.replace(/\./g, "-"));
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  return diff < 14 * 24 * 60 * 60 * 1000; // 14일 이내
}

function NoticeList() {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page") || "1");
  const totalPages = Math.ceil(notices.length / PER_PAGE);
  const sorted = [...notices].sort((a, b) => b.id - a.id);
  const paged = sorted.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE
  );

  return (
    <>
      {/* Hero Banner */}
      <section className="bg-primary py-16 lg:py-20 px-6 lg:px-20">
        <div className="max-w-[1440px] mx-auto">
          <p className="text-accent text-[13px] font-bold tracking-[3px] mb-2">
            NOTICE
          </p>
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
            공지사항
          </h1>
          <p className="text-white/60 text-[15px]">
            진양산업의 새로운 소식과 공지사항을 안내드립니다
          </p>
        </div>
      </section>

      {/* Notice Table */}
      <section className="py-12 px-6 lg:px-20">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-text-gray">
              총 <strong className="text-text-dark">{notices.length}</strong>건
            </p>
          </div>

          {/* Table Header */}
          <div className="hidden md:flex items-center bg-bg-light border-t-2 border-b border-border px-6 h-12 text-[13px] font-bold text-text-dark">
            <div className="w-20 text-center">번호</div>
            <div className="flex-1">제목</div>
            <div className="w-[120px] text-center">등록일</div>
            <div className="w-20 text-center">조회수</div>
          </div>

          {/* Rows */}
          {paged.map((n) => (
            <Link
              key={n.id}
              href={`/notice/${n.id}`}
              className="flex flex-col md:flex-row md:items-center px-6 py-4 md:h-[52px] border-b border-border hover:bg-bg-light/50 transition-colors group"
            >
              <div className="hidden md:block w-20 text-center text-[13px] text-text-gray">
                {n.id}
              </div>
              <div className="flex-1 flex items-center gap-2">
                {isNew(n.date) && (
                  <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shrink-0">
                    NEW
                  </span>
                )}
                <span className="text-sm font-medium text-text-dark group-hover:text-primary transition-colors">
                  {n.title}
                </span>
              </div>
              <div className="flex md:contents mt-2 md:mt-0 gap-4 text-[13px] text-text-gray">
                <span className="md:w-[120px] md:text-center">{n.date}</span>
                <span className="md:w-20 md:text-center">{n.views}</span>
              </div>
            </Link>
          ))}

          {paged.length === 0 && (
            <div className="py-20 text-center text-text-gray">
              등록된 공지사항이 없습니다.
            </div>
          )}

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 pt-8">
            <Link
              href={`/notice?page=${Math.max(1, currentPage - 1)}`}
              className="w-9 h-9 flex items-center justify-center bg-bg-light rounded text-text-gray hover:bg-border transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </Link>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Link
                key={p}
                href={`/notice?page=${p}`}
                className={`w-9 h-9 flex items-center justify-center text-sm font-semibold rounded transition-colors ${
                  p === currentPage
                    ? "bg-primary text-white"
                    : "bg-bg-light text-text-gray hover:bg-border"
                }`}
              >
                {p}
              </Link>
            ))}
            <Link
              href={`/notice?page=${Math.min(totalPages, currentPage + 1)}`}
              className="w-9 h-9 flex items-center justify-center bg-bg-light rounded text-text-gray hover:bg-border transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default function NoticePage() {
  return (
    <>
      <Header />
      <Suspense
        fallback={
          <div className="py-40 text-center text-text-gray">로딩 중...</div>
        }
      >
        <NoticeList />
      </Suspense>
      <Footer />
    </>
  );
}
