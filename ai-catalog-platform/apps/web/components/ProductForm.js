'use client';

import { useState } from 'react';
import { enrichProduct } from '../lib/api';

const initialState = {
  sku: '',
  name: '',
  category: 'storage',
  description: '',
};

export default function ProductForm({ onCreated }) {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await enrichProduct(form);
      onCreated?.(data.product);
      setForm(initialState);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.card}>
      <h2 style={styles.h2}>Create Product Enrichment</h2>
      <div style={styles.grid}>
        <input style={styles.input} placeholder="SKU" value={form.sku} onChange={(e) => updateField('sku', e.target.value)} required />
        <input style={styles.input} placeholder="Product name" value={form.name} onChange={(e) => updateField('name', e.target.value)} required />
        <select style={styles.input} value={form.category} onChange={(e) => updateField('category', e.target.value)}>
          <option value="storage">Storage</option>
          <option value="networking">Networking</option>
          <option value="software">Software</option>
        </select>
        <textarea style={{ ...styles.input, minHeight: 120, gridColumn: '1 / -1' }} placeholder="Describe the product..." value={form.description} onChange={(e) => updateField('description', e.target.value)} required />
      </div>
      {error ? <p style={styles.error}>{error}</p> : null}
      <button style={styles.button} disabled={loading} type="submit">
        {loading ? 'Enriching...' : 'Enrich Product'}
      </button>
    </form>
  );
}

const styles = {
  card: {
    background: 'white',
    padding: 24,
    borderRadius: 16,
    boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
  },
  h2: { marginTop: 0, marginBottom: 16 },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 },
  input: {
    padding: 12,
    borderRadius: 10,
    border: '1px solid #ddd',
    fontSize: 14,
  },
  button: {
    marginTop: 16,
    border: 'none',
    background: '#111827',
    color: 'white',
    padding: '12px 16px',
    borderRadius: 10,
    cursor: 'pointer',
  },
  error: { color: '#b91c1c' },
};
