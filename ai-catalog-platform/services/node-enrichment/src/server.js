import dotenv from 'dotenv';
import { createApp } from './app.js';
import { initDb } from './lib/db.js';

dotenv.config();

const port = Number(process.env.PORT || 4000);
const validatorApiUrl = process.env.VALIDATOR_API_URL || 'http://localhost:8080';

await initDb();

const app = createApp({ validatorApiUrl });
app.listen(port, () => {
  console.log(`Node enrichment service listening on ${port}`);
});
