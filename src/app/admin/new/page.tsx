"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminNewNoticePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    setLoading(true);
    const res = await fetch("/api/notices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: title.trim(), content: content.trim() }),
    });

    if (res.ok) {
      router.push("/admin");
    } else {
      const data = await res.json();
      alert(data.error || "등록에 실패했습니다.");
    }
    setLoading(false);
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-text-dark">새 공지 작성</h1>
        <Link
          href="/admin"
          className="text-sm text-text-gray hover:text-primary transition-colors"
        >
          &larr; 목록으로
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-border p-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-text-dark mb-2">
            제목
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-border rounded px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            placeholder="공지사항 제목을 입력하세요"
            autoFocus
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-text-dark mb-2">
            내용
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={15}
            className="w-full border border-border rounded px-4 py-3 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-y"
            placeholder="공지사항 내용을 입력하세요"
          />
        </div>

        <div className="flex gap-2 justify-end">
          <Link
            href="/admin"
            className="border border-border text-text-gray text-sm px-6 py-2.5 rounded hover:bg-bg-light transition-colors"
          >
            취소
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-white text-sm font-semibold px-6 py-2.5 rounded hover:bg-primary-dark transition-colors disabled:opacity-50"
          >
            {loading ? "등록 중..." : "등록"}
          </button>
        </div>
      </form>
    </div>
  );
}
