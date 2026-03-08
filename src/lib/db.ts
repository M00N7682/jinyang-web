import { Pool } from "pg";

export interface Notice {
  id: number;
  title: string;
  date: string;
  views: number;
  content: string;
}

const connectionString = (process.env.POSTGRES_URL || "").replace(
  /(\?|&)sslmode=[^&]*/g,
  "$1"
);

const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false },
});

export async function getNotices(page: number = 1, limit: number = 5) {
  const offset = (page - 1) * limit;

  const [dataResult, countResult] = await Promise.all([
    pool.query(
      `SELECT id, title, TO_CHAR(date, 'YYYY.MM.DD') as date, views, content
       FROM notices ORDER BY id DESC LIMIT $1 OFFSET $2`,
      [limit, offset]
    ),
    pool.query(`SELECT COUNT(*) as total FROM notices`),
  ]);

  return {
    notices: dataResult.rows as Notice[],
    total: Number(countResult.rows[0].total),
  };
}

export async function getNoticeById(id: number) {
  const result = await pool.query(
    `SELECT id, title, TO_CHAR(date, 'YYYY.MM.DD') as date, views, content
     FROM notices WHERE id = $1`,
    [id]
  );
  return (result.rows[0] as Notice) ?? null;
}

export async function getAdjacentNotices(id: number) {
  const [prevResult, nextResult] = await Promise.all([
    pool.query(
      `SELECT id, title, TO_CHAR(date, 'YYYY.MM.DD') as date
       FROM notices WHERE id < $1 ORDER BY id DESC LIMIT 1`,
      [id]
    ),
    pool.query(
      `SELECT id, title, TO_CHAR(date, 'YYYY.MM.DD') as date
       FROM notices WHERE id > $1 ORDER BY id ASC LIMIT 1`,
      [id]
    ),
  ]);

  return {
    prev: (prevResult.rows[0] as Pick<Notice, "id" | "title" | "date">) ?? null,
    next: (nextResult.rows[0] as Pick<Notice, "id" | "title" | "date">) ?? null,
  };
}

export async function createNotice(title: string, content: string) {
  const result = await pool.query(
    `INSERT INTO notices (title, content, date, views)
     VALUES ($1, $2, NOW(), 0) RETURNING id`,
    [title, content]
  );
  return result.rows[0].id as number;
}

export async function deleteNotice(id: number) {
  await pool.query(`DELETE FROM notices WHERE id = $1`, [id]);
}

export async function incrementViews(id: number) {
  await pool.query(`UPDATE notices SET views = views + 1 WHERE id = $1`, [id]);
}
