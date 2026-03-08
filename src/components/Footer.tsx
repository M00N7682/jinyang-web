export default function Footer() {
  return (
    <footer className="bg-bg-dark text-white">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-20 py-12">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">(주)진양산업</h3>
            <div className="space-y-1 text-sm text-white/60">
              <p>대표: 윤재국</p>
              <p>광주광역시 광산구 평동산단2번로 132</p>
              <p>TEL: 062-944-5371 | FAX: 062-944-5372</p>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-8">
          <p className="text-xs text-white/40">
            &copy; 2026 (주)진양산업. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
