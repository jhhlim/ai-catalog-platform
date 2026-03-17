const API_URL = process.env.NEXT_PUBLIC_NODE_API_URL || 'http://localhost:4000';

export async function enrichProduct(payload) {
  const response = await fetch(`${API_URL}/api/catalog/enrich`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Failed to enrich product');
  }

  return response.json();
}

export async function fetchProducts() {
  const response = await fetch(`${API_URL}/api/catalog/products`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  return response.json();
}
