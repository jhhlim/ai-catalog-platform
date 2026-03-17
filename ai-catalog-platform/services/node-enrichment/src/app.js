import express from 'express';
import cors from 'cors';
import { createCatalogRouter } from './routes/catalog.js';

export function createApp({ validatorApiUrl }) {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.use('/api/catalog', createCatalogRouter({ validatorApiUrl }));

  app.use((err, _req, res, _next) => {
    console.error(err);
    res.status(500).json({ error: err.message || 'Internal server error' });
  });

  return app;
}
