export default function ProductTable({ products }) {
  return (
    <div style={styles.card}>
      <h2 style={styles.h2}>Enriched Catalog</h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>SKU</th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Category</th>
              <th style={styles.th}>Attributes</th>
              <th style={styles.th}>SEO Title</th>
              <th style={styles.th}>Validation</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td style={styles.td}>{product.sku}</td>
                <td style={styles.td}>{product.name}</td>
                <td style={styles.td}>{product.category}</td>
                <td style={styles.td}>
                  {Object.entries(product.attributes || {}).map(([key, value]) => (
                    <div key={key}><strong>{key}:</strong> {String(value)}</div>
                  ))}
                </td>
                <td style={styles.td}>{product.seoTitle}</td>
                <td style={styles.td}>{product.validation?.valid ? 'Valid' : `Needs work: ${(product.validation?.errors || []).join(', ')}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
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
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { textAlign: 'left', borderBottom: '1px solid #ddd', padding: 12, fontSize: 13 },
  td: { borderBottom: '1px solid #eee', padding: 12, verticalAlign: 'top', fontSize: 13 },
};
