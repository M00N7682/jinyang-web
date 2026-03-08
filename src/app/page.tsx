import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const marqueeText = "30+ 년 업력  ·  현대·기아자동차 Tier2 협력업체  ·  대형 SIMPAC 프레스 자동화 라인 보유  ·  품질 불량 ZERO화 달성  ·  ISO 9001 / ISO 14001 환경경영시스템 인증  ·  광주광역시 평동공단 소재  ·  자동차 차체용 신품 부품 전문 제조기업  ·  INO-BIZ 경영혁신형 중소기업  ·  부품·소재 전문기업 인증";

const services = [
  {
    title: "차체 부품 프레스 가공",
    desc: "최신 SIMPAC 프레스 설비로 자동차 차체용 고정밀 신품 부품을 생산합니다",
    img: "/images/equipment.jpeg",
  },
  {
    title: "품질 관리",
    desc: "ISO 9001 인증 기반의 엄격한 품질관리로 품질 불량 zero화를 실현합니다",
    img: "/images/factory-main.jpeg",
  },
];

const facilities = [
  { label: "프레스 공장동", img: "/images/factory-main.jpeg" },
  { label: "생산 설비", img: "/images/equipment.jpeg" },
  { label: "사무동", img: "/images/office.jpeg" },
];

const history = [
  { year: "2025", items: [{ month: "", text: "ISO 9001, ISO 14001 인증" }] },
  { year: "2011", items: [{ month: "05", text: "부품·소재 전문 기업 확인" }, { month: "01", text: "자립형 유망 중소 기업 인증" }] },
  { year: "2009", items: [{ month: "11", text: "경영혁신형 중소기업 선정" }] },
  { year: "2008", items: [{ month: "04", text: "공장증축 (997㎡)" }, { month: "", text: "INO-BIZ 인증" }] },
  { year: "2003", items: [{ month: "01", text: "ISO 9001 인증" }] },
  { year: "2002", items: [{ month: "07", text: "공장이전 (광주 평동 공단)" }] },
  { year: "2001", items: [{ month: "01", text: "외국인 투자기업 등록" }] },
  { year: "2000", items: [{ month: "02", text: "강제 인공 어초 실용실안 등록" }] },
  { year: "1999", items: [{ month: "06", text: "HOME LORRY HOSE AUTO REEL 개발" }, { month: "05", text: "기아자동차 협력업체 등록" }] },
  { year: "1998", items: [{ month: "05", text: "현대자동차 협력업체 등록" }] },
  { year: "1997", items: [{ month: "11", text: "(주)진양산업 설립 (광주광역시 하남공단내)" }] },
];

export default function HomePage() {
  return (
    <>
      <Header />

      {/* Hero */}
      <section className="relative h-[640px] flex items-center overflow-hidden">
        <Image
          src="/images/campus.jpeg"
          alt="진양산업 전경"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/90 to-primary-dark/50" />
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-20 w-full">
          <div className="max-w-[700px] space-y-6">
            <p className="text-accent text-sm font-semibold tracking-[2px]">
              자동차 차체용 신품 부품 전문기업
            </p>
            <h1 className="text-4xl lg:text-[52px] font-extrabold text-white leading-[1.2]">
              자동차 차체 부품의
              <br />
              새로운 기준
            </h1>
            <p className="text-lg text-white/80 leading-relaxed">
              1997년 설립 이래 현대·기아자동차 협력업체로서
              <br />
              최고 품질의 차체용 프레스 부품을 공급합니다
            </p>
            <div className="flex gap-4 pt-2">
              <Link
                href="#about"
                className="bg-accent text-text-dark font-semibold px-8 py-3.5 rounded hover:bg-yellow-400 transition-colors"
              >
                회사소개 보기
              </Link>
              <Link
                href="#contact"
                className="border-2 border-white text-white font-semibold px-8 py-3.5 rounded hover:bg-white/10 transition-colors"
              >
                문의하기
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <section className="bg-primary-dark overflow-hidden py-4">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(4)].map((_, i) => (
            <span
              key={i}
              className="mx-8 text-sm lg:text-base font-semibold text-white/80 tracking-wide"
            >
              {marqueeText}
            </span>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
          <div className="text-center mb-12">
            <p className="text-primary-light text-[13px] font-bold tracking-[3px] mb-3">
              ABOUT US
            </p>
            <h2 className="text-4xl font-bold text-text-dark mb-3">회사소개</h2>
            <div className="w-[60px] h-[3px] bg-primary mx-auto mb-4" />
            <p className="text-text-gray">
              1997년 설립 이래 자동차 차체용 부품 제조 분야의 전문기업으로 성장해 왔습니다
            </p>
          </div>
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <div className="w-full lg:w-1/2 h-[400px] relative rounded-lg overflow-hidden">
              <Image
                src="/images/factory-main.jpeg"
                alt="진양산업 외관"
                fill
                className="object-cover"
              />
            </div>
            <div className="w-full lg:w-1/2 space-y-6 text-text-gray leading-[1.8]">
              <p>
                (주)진양산업은 광주광역시에 본사를 둔 <strong className="text-text-dark">자동차 차체용 신품 부품 전문 제조기업</strong>입니다.
              </p>
              <p>
                1997년 설립 이후 1998년 현대자동차, 1999년 기아자동차 협력업체로 등록되어 자동차 차체 부품을 안정적으로 공급하고 있습니다.
              </p>
              <p>
                ISO 9001, ISO 14001, INO-BIZ 인증, 부품·소재 전문기업 확인 등 다수의 인증을 획득하며 기술력과 품질을 인정받고 있습니다.
              </p>
              <p>
                2002년 광주 평동공단으로 이전, 2008년 공장 증축(997㎡)을 거쳐 지속적으로 생산 역량을 확대하고 있습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* History */}
      <section id="history" className="py-20 bg-bg-light">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
          <div className="text-center mb-12">
            <p className="text-primary-light text-[13px] font-bold tracking-[3px] mb-3">
              HISTORY
            </p>
            <h2 className="text-4xl font-bold text-text-dark mb-3">연혁</h2>
            <div className="w-[60px] h-[3px] bg-primary mx-auto mb-4" />
          </div>
          <div className="max-w-3xl mx-auto">
            {history.map((group) => (
              <div key={group.year} className="flex gap-6 lg:gap-12 mb-1">
                <div className="w-16 lg:w-20 text-right shrink-0 pt-4">
                  <span className="text-xl lg:text-2xl font-bold text-primary-light">{group.year}</span>
                </div>
                <div className="relative pl-8 border-l-2 border-border pb-6">
                  {group.items.map((item, i) => (
                    <div key={i} className="relative py-3">
                      <div className="absolute -left-[25px] top-[18px] w-3 h-3 rounded-full bg-white border-2 border-primary-light" />
                      <div className="flex items-baseline gap-3">
                        {item.month && (
                          <span className="text-sm font-bold text-text-gray w-6">{item.month}</span>
                        )}
                        <span className="text-[15px] text-text-dark">{item.text}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
          <div className="text-center mb-12">
            <p className="text-primary-light text-[13px] font-bold tracking-[3px] mb-3">
              BUSINESS
            </p>
            <h2 className="text-4xl font-bold text-text-dark mb-3">사업영역</h2>
            <div className="w-[60px] h-[3px] bg-primary mx-auto mb-4" />
            <p className="text-text-gray">
              자동차 차체용 부품 프레스 가공과 철저한 품질관리 체계를 갖추고 있습니다
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {services.map((svc) => (
              <div
                key={svc.title}
                className="bg-white rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative h-[200px]">
                  <Image
                    src={svc.img}
                    alt={svc.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-bold text-text-dark">
                    {svc.title}
                  </h3>
                  <p className="text-sm text-text-gray leading-relaxed">
                    {svc.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section id="facilities" className="py-20 bg-bg-light">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
          <div className="text-center mb-12">
            <p className="text-primary-light text-[13px] font-bold tracking-[3px] mb-3">
              FACILITIES
            </p>
            <h2 className="text-4xl font-bold text-text-dark mb-3">시설현황</h2>
            <div className="w-[60px] h-[3px] bg-primary mx-auto mb-4" />
            <p className="text-text-gray">
              광주 평동공단 내 최신 자동화 설비와 체계적인 생산 시스템을 갖추고 있습니다
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {facilities.map((fac) => (
              <div
                key={fac.label}
                className="relative h-[300px] rounded-lg overflow-hidden group"
              >
                <Image
                  src={fac.img}
                  alt={fac.label}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="bg-black/60 text-white text-[13px] font-semibold px-4 py-2 rounded">
                    {fac.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-primary py-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">문의 및 상담</h2>
          <p className="text-white/70 mb-8">
            자동차 차체 부품 관련 문의를 환영합니다
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-8 mb-8">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="text-lg font-semibold text-white">062-944-5371</span>
            </div>
          </div>
          <Link
            href="tel:062-944-5371"
            className="inline-block bg-accent text-text-dark font-bold px-10 py-4 rounded hover:bg-yellow-400 transition-colors"
          >
            전화 문의하기
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
