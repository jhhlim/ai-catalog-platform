'use client';

import { useEffect, useState } from 'react';
import ProductForm from '../components/ProductForm';
import ProductTable from '../components/ProductTable';
import { fetchProducts } from '../lib/api';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadProducts = async () => {
    try {
      const data = await fetchProducts();
      setProducts(data.products || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <main style={styles.page}>
      <div style={styles.hero}>
        <h1 style={styles.title}>AI Catalog Enrichment Platform</h1>
        <p style={styles.subtitle}>
          Full-stack demo with Next.js, Node.js, Spring Boot, PostgreSQL, Docker, and LLM-driven enrichment.
        </p>
      </div>
      <div style={styles.layout}>
        <ProductForm onCreated={(product) => setProducts((prev) => [product, ...prev])} />
        {loading ? <div style={styles.card}>Loading products...</div> : <ProductTable products={products} />}
      </div>
    </main>
  );
}

const styles = {
  page: { padding: 32, maxWidth: 1280, margin: '0 auto' },
  hero: { marginBottom: 24 },
  title: { marginBottom: 8 },
  subtitle: { color: '#4b5563' },
  layout: { display: 'grid', gap: 20 },
  card: {
    background: 'white',
    padding: 24,
    borderRadius: 16,
    boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
  },
};
