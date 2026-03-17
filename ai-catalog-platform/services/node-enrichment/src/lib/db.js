import pg from 'pg';

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL;
export const pool = connectionString
  ? new Pool({ connectionString })
  : null;

export async function initDb() {
  if (!pool) return;

  await pool.query(`
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      sku TEXT NOT NULL,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      description TEXT NOT NULL,
      attributes JSONB NOT NULL,
      seo_title TEXT NOT NULL,
      seo_description TEXT NOT NULL,
      contextual_tags JSONB NOT NULL,
      validation JSONB NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);
}

export async function insertProduct(product) {
  if (!pool) {
    return { id: String(Date.now()), ...product };
  }

  const result = await pool.query(
    `INSERT INTO products (sku, name, category, description, attributes, seo_title, seo_description, contextual_tags, validation)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
     RETURNING id, sku, name, category, description, attributes, seo_title, seo_description, contextual_tags, validation, created_at`,
    [
      product.sku,
      product.name,
      product.category,
      product.description,
      product.attributes,
      product.seoTitle,
      product.seoDescription,
      product.contextualTags,
      product.validation,
    ]
  );

  const row = result.rows[0];
  return mapRow(row);
}

export async function listProducts() {
  if (!pool) return [];
  const result = await pool.query(`SELECT * FROM products ORDER BY created_at DESC LIMIT 50`);
  return result.rows.map(mapRow);
}

function mapRow(row) {
  return {
    id: row.id,
    sku: row.sku,
    name: row.name,
    category: row.category,
    description: row.description,
    attributes: row.attributes,
    seoTitle: row.seo_title,
    seoDescription: row.seo_description,
    contextualTags: row.contextual_tags,
    validation: row.validation,
    createdAt: row.created_at,
  };
}
