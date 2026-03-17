import { Router } from 'express';
import { generateEnrichment } from '../lib/enrichment.js';
import { insertProduct, listProducts } from '../lib/db.js';
import { validateProduct } from '../lib/validatorClient.js';

export function createCatalogRouter({ validatorApiUrl }) {
  const router = Router();

  router.get('/health', (_req, res) => {
    res.json({ ok: true, service: 'node-enrichment' });
  });

  router.get('/products', async (_req, res, next) => {
    try {
      const products = await listProducts();
      res.json({ products });
    } catch (err) {
      next(err);
    }
  });

  router.post('/enrich', async (req, res, next) => {
    try {
      const { sku, name, category, description } = req.body;
      if (!sku || !name || !category || !description) {
        return res.status(400).json({ error: 'sku, name, category, and description are required' });
      }

      const enrichment = await generateEnrichment({ sku, name, category, description });
      const validation = await validateProduct(validatorApiUrl, {
        sku,
        name,
        category,
        description,
        attributes: enrichment.attributes,
      });

      const product = await insertProduct({
        sku,
        name,
        category,
        description,
        ...enrichment,
        validation,
      });

      res.status(201).json({ product });
    } catch (err) {
      next(err);
    }
  });

  return router;
}
