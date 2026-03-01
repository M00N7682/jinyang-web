import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: { rejectUnauthorized: false },
});

const notices = [
  {
    id: 1,
    title: "홈페이지 리뉴얼 안내",
    date: "2025-08-15",
    views: 523,
    content: `안녕하세요, (주)진양산업입니다.

당사 홈페이지가 새롭게 리뉴얼되었습니다.

보다 편리하고 직관적인 인터페이스로 회사소개, 사업영역, 시설현황 등의 정보를 확인하실 수 있습니다.

이용 중 불편한 점이 있으시면 언제든 연락 부탁드립니다.

감사합니다.`,
  },
  {
    id: 2,
    title: "2025년 하반기 채용 공고",
    date: "2025-09-01",
    views: 456,
    content: `안녕하세요, (주)진양산업입니다.

2025년 하반기 신입/경력 사원을 모집합니다.

■ 모집 분야
- 프레스 가공 기술직 (2명)
- 금형 설계 엔지니어 (1명)
- 품질관리 담당자 (1명)

■ 지원 자격
- 관련 분야 경력 2년 이상 (경력직)
- 신입 지원 가능 (기술직)

■ 지원 방법: 이메일 접수 (info@jinyang.co.kr)
■ 마감일: 2025년 9월 30일

많은 지원 부탁드립니다.`,
  },
  {
    id: 3,
    title: "자동화 로봇 라인 증설 공사 안내",
    date: "2025-11-05",
    views: 312,
    content: `안녕하세요, (주)진양산업입니다.

생산성 향상을 위한 자동화 로봇 라인 증설 공사를 진행합니다.

■ 공사 기간: 2025년 11월 10일 ~ 12월 20일
■ 공사 내용: B동 프레스 라인 로봇 자동화

공사 기간 중 일부 생산 라인 조정이 있을 수 있으며, 납기에는 영향이 없도록 조치하겠습니다.

감사합니다.`,
  },
  {
    id: 4,
    title: "ISO 14001 환경경영시스템 재인증 완료",
    date: "2025-12-10",
    views: 187,
    content: `안녕하세요, (주)진양산업입니다.

ISO 14001 환경경영시스템 재인증 심사를 성공적으로 완료하였습니다.

당사는 환경 보전과 지속 가능한 경영을 위해 체계적인 환경관리 시스템을 운영하고 있으며, 이번 재인증을 통해 환경경영에 대한 의지를 다시 한번 확인하였습니다.

감사합니다.`,
  },
  {
    id: 5,
    title: "2026년 설 연휴 휴무 안내",
    date: "2026-01-20",
    views: 234,
    content: `안녕하세요, (주)진양산업입니다.

2026년 설 연휴 휴무일정을 안내드립니다.

■ 휴무 기간: 2026년 1월 28일(수) ~ 1월 30일(금)
■ 업무 재개: 2026년 2월 2일(월)

연휴 기간 중 긴급 문의는 062-000-0000으로 연락 부탁드립니다.

새해 복 많이 받으세요!`,
  },
  {
    id: 6,
    title: "신규 SIMPAC 프레스 설비 도입 완료",
    date: "2026-02-15",
    views: 98,
    content: `안녕하세요, (주)진양산업입니다.

생산 역량 강화를 위한 신규 SIMPAC 프레스 설비 도입이 완료되었습니다.

■ 도입 설비
- SIMPAC DEsP-600 2대
- 자동화 로봇 라인 1식

본 설비 도입을 통해 차체 부품 생산 능력이 약 20% 향상될 것으로 기대됩니다.

감사합니다.`,
  },
  {
    id: 7,
    title: "2026년 Tier2 품질 혁신 목표 달성 안내",
    date: "2026-02-28",
    views: 152,
    content: `안녕하세요, (주)진양산업입니다.

2026년 Tier2 품질 혁신 목표를 성공적으로 달성하였음을 안내드립니다.

당사는 현대·기아자동차 협력업체로서 자동차 차체용 부품의 품질 향상을 위해 끊임없이 노력해 왔으며, 올해 설정한 품질 혁신 목표를 전 항목 달성하였습니다.

■ 주요 달성 내용
- 불량률 0.02% 이하 달성
- 납기 준수율 99.9% 달성
- 고객 클레임 전년 대비 50% 감소

앞으로도 최고 품질의 차체 부품을 공급하기 위해 최선을 다하겠습니다.

감사합니다.`,
  },
];

async function seed() {
  console.log("Creating notices table...");

  await pool.query(`
    CREATE TABLE IF NOT EXISTS notices (
      id SERIAL PRIMARY KEY,
      title VARCHAR(500) NOT NULL,
      content TEXT NOT NULL,
      date TIMESTAMP NOT NULL DEFAULT NOW(),
      views INTEGER NOT NULL DEFAULT 0
    )
  `);

  console.log("Table created.");

  const existing = await pool.query(`SELECT COUNT(*) as count FROM notices`);
  if (Number(existing.rows[0].count) > 0) {
    console.log(`Table already has ${existing.rows[0].count} rows. Skipping seed.`);
    return;
  }

  console.log("Inserting seed data...");

  for (const n of notices) {
    await pool.query(
      `INSERT INTO notices (id, title, content, date, views)
       VALUES ($1, $2, $3, $4::timestamp, $5)`,
      [n.id, n.title, n.content, n.date, n.views]
    );
    console.log(`  Inserted: ${n.title}`);
  }

  await pool.query(`SELECT setval('notices_id_seq', (SELECT MAX(id) FROM notices))`);

  console.log("Seed complete!");
}

seed()
  .then(() => pool.end())
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
  });
