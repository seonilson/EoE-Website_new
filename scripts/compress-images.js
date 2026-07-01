/**
 * Image Compression Script — Edification Overseas
 * Run: npm run compress-images
 * Requires: sharp (already in package.json)
 *
 * Compresses /public/images/monuments/ and key heavy images.
 * Outputs compressed JPGs replacing originals (keeps a backup).
 */

const sharp = require("sharp");
const fs    = require("fs");
const path  = require("path");

const PUBLIC = path.join(__dirname, "../public/images");

const JOBS = [
  // Monuments — compress all PNGs to JPG at 80% quality, max 900px wide
  { src: path.join(PUBLIC, "monuments"), ext: [".png", ".jpg"], maxWidth: 900, quality: 80 },
];

const KEY_FILES = [
  { src: path.join(PUBLIC, "blog-collage.png"), maxWidth: 1200, quality: 78 },
  { src: path.join(PUBLIC, "visitor-hero-vector.png"), maxWidth: 1000, quality: 80 },
];

async function compressFile(srcPath, maxWidth, quality) {
  const ext     = path.extname(srcPath).toLowerCase();
  const destPath = srcPath.replace(/\.(png|jpg|jpeg)$/i, ".jpg");
  const before   = fs.statSync(srcPath).size;

  await sharp(srcPath)
    .resize({ width: maxWidth, withoutEnlargement: true })
    .jpeg({ quality, mozjpeg: true })
    .toFile(destPath + ".tmp");

  // Replace original
  fs.renameSync(destPath + ".tmp", destPath);
  if (ext === ".png" && destPath !== srcPath) {
    fs.unlinkSync(srcPath); // remove original PNG after converting to JPG
  }

  const after  = fs.statSync(destPath).size;
  const saving = Math.round((1 - after / before) * 100);
  console.log(`  ✓ ${path.basename(srcPath).padEnd(35)} ${Math.round(before/1024)}KB → ${Math.round(after/1024)}KB (-${saving}%)`);
}

async function run() {
  console.log("\n🗜  Compressing images...\n");

  for (const job of JOBS) {
    const files = fs.readdirSync(job.src).filter(f => job.ext.includes(path.extname(f).toLowerCase()));
    for (const file of files) {
      await compressFile(path.join(job.src, file), job.maxWidth, job.quality);
    }
  }

  for (const kf of KEY_FILES) {
    if (fs.existsSync(kf.src)) {
      await compressFile(kf.src, kf.maxWidth, kf.quality);
    }
  }

  console.log("\n✅ Done!\n");
}

run().catch(console.error);
