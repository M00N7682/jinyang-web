"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Notice {
  id: number;
  title: string;
  date: string;
  views: number;
}

export default function AdminPage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const limit = 10;
  const totalPages = Math.ceil(total / limit);

  async function fetchNotices(p: number) {
    setLoading(true);
    const res = await fetch(`/api/notices?page=${p}&limit=${limit}`);
    const data = await res.json();
    setNotices(data.notices);
    setTotal(data.total);
    setLoading(false);
  }

  useEffect(() => {
    fetchNotices(page);
  }, [page]);

  async function handleDelete(id: number, title: string) {
    if (!confirm(`"${title}" 공지를 삭제하시겠습니까?`)) return;

    const res = await fetch(`/api/notices/${id}`, { method: "DELETE" });
    if (res.ok) {
      fetchNotices(page);
    } else {
      alert("삭제에 실패했습니다.");
    }
  }

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-text-dark">공지사항 관리</h1>
        <div className="flex gap-2">
          <Link
            href="/admin/new"
            className="bg-primary text-white text-sm font-semibold px-4 py-2 rounded hover:bg-primary-dark transition-colors"
          >
            새 공지 작성
          </Link>
          <button
            onClick={handleLogout}
            className="border border-border text-text-gray text-sm px-4 py-2 rounded hover:bg-white transition-colors"
          >
            로그아웃
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border border-border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-bg-light border-b border-border text-[13px] font-bold text-text-dark">
              <th className="w-16 py-3 text-center">번호</th>
              <th className="text-left py-3 px-4">제목</th>
              <th className="w-[100px] py-3 text-center">등록일</th>
              <th className="w-16 py-3 text-center">조회</th>
              <th className="w-20 py-3 text-center">관리</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="py-12 text-center text-text-gray text-sm">
                  로딩 중...
                </td>
              </tr>
            ) : notices.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-12 text-center text-text-gray text-sm">
                  등록된 공지사항이 없습니다.
                </td>
              </tr>
            ) : (
              notices.map((n) => (
                <tr key={n.id} className="border-b border-border hover:bg-bg-light/50">
                  <td className="py-3 text-center text-[13px] text-text-gray">{n.id}</td>
                  <td className="py-3 px-4 text-sm text-text-dark">{n.title}</td>
                  <td className="py-3 text-center text-[13px] text-text-gray">{n.date}</td>
                  <td className="py-3 text-center text-[13px] text-text-gray">{n.views}</td>
                  <td className="py-3 text-center">
                    <button
                      onClick={() => handleDelete(n.id, n.title)}
                      className="text-red-500 hover:text-red-700 text-[13px] font-medium transition-colors"
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 pt-6">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="w-8 h-8 flex items-center justify-center bg-white border border-border rounded text-text-gray hover:bg-bg-light disabled:opacity-40 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`w-8 h-8 flex items-center justify-center text-sm font-semibold rounded transition-colors ${
                p === page
                  ? "bg-primary text-white"
                  : "bg-white border border-border text-text-gray hover:bg-bg-light"
              }`}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="w-8 h-8 flex items-center justify-center bg-white border border-border rounded text-text-gray hover:bg-bg-light disabled:opacity-40 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}

      {/* Link to public site */}
      <div className="mt-6 text-center">
        <Link href="/notice" className="text-sm text-text-gray hover:text-primary transition-colors">
          공개 공지사항 페이지 보기 &rarr;
        </Link>
      </div>
    </div>
  );
}
