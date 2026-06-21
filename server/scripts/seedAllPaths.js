// server/scripts/seedAllPaths.js
import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import { connectDB } from '../src/config/db.js';
import { LearningPath } from '../src/modules/skillmap/skillmap.model.js';

await connectDB();

const seedDir = path.resolve('./seed-data');
const files = fs.readdirSync(seedDir).filter(f => f.endsWith('.json'));

for (const file of files) {
  const data = JSON.parse(fs.readFileSync(path.join(seedDir, file), 'utf-8'));
  await LearningPath.deleteOne({ slug: data.slug });
  await LearningPath.create(data);
  console.log(`✅ Seeded ${data.slug}`);
}

await mongoose.connection.close();
process.exit(0);