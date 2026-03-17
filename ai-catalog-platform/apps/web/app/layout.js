export const metadata = {
  title: 'AI Catalog Platform',
  description: 'Catalog enrichment dashboard',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'Arial, sans-serif', background: '#f7f7f8' }}>
        {children}
      </body>
    </html>
  );
}
