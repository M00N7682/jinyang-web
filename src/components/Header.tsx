"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { label: "회사소개", href: "/#about" },
  { label: "사업영역", href: "/#services" },
  { label: "시설현황", href: "/#facilities" },
  { label: "공지사항", href: "/notice" },
  { label: "인증/수상", href: "/#about" },
  { label: "오시는 길", href: "/#contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between h-[72px] px-6 lg:px-20">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-primary" />
          <span className="text-xl font-bold text-primary">(주)진양산업</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-[15px] font-medium text-text-dark hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/#contact"
          className="hidden lg:block bg-primary text-white text-sm font-semibold px-6 py-2.5 rounded hover:bg-primary-dark transition-colors"
        >
          문의하기
        </Link>

        <button
          className="lg:hidden p-2"
          onClick={() => setOpen(!open)}
          aria-label="메뉴 열기"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-white border-t border-border px-6 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="block text-[15px] font-medium text-text-dark"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            className="block bg-primary text-white text-sm font-semibold px-6 py-2.5 rounded text-center mt-3"
            onClick={() => setOpen(false)}
          >
            문의하기
          </Link>
        </div>
      )}
    </header>
  );
}
