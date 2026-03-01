import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { notices } from "@/data/notices";

export function generateStaticParams() {
  return notices.map((n) => ({ id: String(n.id) }));
}

export default async function NoticeDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const notice = notices.find((n) => n.id === Number(id));

  if (!notice) {
    notFound();
  }

  const sorted = [...notices].sort((a, b) => b.id - a.id);
  const idx = sorted.findIndex((n) => n.id === notice.id);
  const prev = idx < sorted.length - 1 ? sorted[idx + 1] : null;
  const next = idx > 0 ? sorted[idx - 1] : null;

  return (
    <>
      <Header />

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

      {/* Detail Content */}
      <section className="py-12 px-6 lg:px-20">
        <div className="max-w-[1440px] mx-auto">
          {/* Title Area */}
          <div className="border-t-2 border-border pt-6 pb-4 border-b">
            <h2 className="text-xl lg:text-2xl font-bold text-text-dark mb-3">
              {notice.title}
            </h2>
            <div className="flex gap-6 text-[13px] text-text-gray">
              <span>등록일: {notice.date}</span>
              <span>조회수: {notice.views}</span>
            </div>
          </div>

          {/* Content */}
          <div className="py-10 min-h-[300px] border-b border-border">
            <div className="text-[15px] text-text-dark leading-[1.9] whitespace-pre-line">
              {notice.content}
            </div>
          </div>

          {/* Prev/Next Navigation */}
          <div className="border-b border-border">
            {next && (
              <Link
                href={`/notice/${next.id}`}
                className="flex items-center gap-4 px-4 py-3 hover:bg-bg-light transition-colors"
              >
                <span className="text-[13px] font-bold text-text-gray w-16 shrink-0">
                  다음글
                </span>
                <svg
                  className="w-4 h-4 text-text-light shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 15l7-7 7 7"
                  />
                </svg>
                <span className="text-sm text-text-dark truncate">
                  {next.title}
                </span>
                <span className="text-[13px] text-text-light ml-auto shrink-0">
                  {next.date}
                </span>
              </Link>
            )}
            {prev && (
              <Link
                href={`/notice/${prev.id}`}
                className="flex items-center gap-4 px-4 py-3 hover:bg-bg-light transition-colors border-t border-border"
              >
                <span className="text-[13px] font-bold text-text-gray w-16 shrink-0">
                  이전글
                </span>
                <svg
                  className="w-4 h-4 text-text-light shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
                <span className="text-sm text-text-dark truncate">
                  {prev.title}
                </span>
                <span className="text-[13px] text-text-light ml-auto shrink-0">
                  {prev.date}
                </span>
              </Link>
            )}
          </div>

          {/* Back Button */}
          <div className="pt-8 text-center">
            <Link
              href="/notice"
              className="inline-block bg-primary text-white text-sm font-semibold px-8 py-3 rounded hover:bg-primary-dark transition-colors"
            >
              목록으로
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
