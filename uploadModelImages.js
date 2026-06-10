require('dotenv').config();
const cloudinary = require('./config/cloudinary');
const https      = require('https');
const http       = require('http');
const fs         = require('fs');
const path       = require('path');
const os         = require('os');

// ─── CORRECT KID MODEL IMAGES ────────────────────────────────────────────────
// Single child, plain background, standing/sitting, clearly visible full body
const KID_MODELS = [
  {
    key:  'MODEL_KID_FRONT',
    // Girl in white dress, standing, front facing, plain background
    url:  'https://images.pexels.com/photos/3771679/pexels-photo-3771679.jpeg?auto=compress&cs=tinysrgb&w=768',
    note: 'Kid — front view (single child, standing, front)',
  },
  {
    key:  'MODEL_KID_LEFT',
    // Boy standing, side profile, plain background
    url:  'https://images.pexels.com/photos/3622608/pexels-photo-3622608.jpeg?auto=compress&cs=tinysrgb&w=768',
    note: 'Kid — left angle (single child, side angle)',
  },
  {
    key:  'MODEL_KID_RIGHT',
    // Child standing, right angle, plain background
    url:  'https://images.pexels.com/photos/3771836/pexels-photo-3771836.jpeg?auto=compress&cs=tinysrgb&w=768',
    note: 'Kid — right angle (single child, right side)',
  },
  {
    key:  'MODEL_KID_BACK',
    // Child from behind, plain background
    url:  'https://images.pexels.com/photos/3771680/pexels-photo-3771680.jpeg?auto=compress&cs=tinysrgb&w=768',
    note: 'Kid — back view (child from behind)',
  },
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function downloadFile(url, destPath, redirectCount = 0) {
  return new Promise((resolve, reject) => {
    if (redirectCount > 5) return reject(new Error('Too many redirects'));
    const lib = url.startsWith('https') ? https : http;
    const req = lib.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
        'Referer': 'https://www.pexels.com/',
      }
    }, (res) => {
      if ([301,302,307,308].includes(res.statusCode)) {
        return downloadFile(res.headers.location, destPath, redirectCount + 1).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        res.resume();
        return reject(new Error(`HTTP ${res.statusCode}`));
      }
      const file = fs.createWriteStream(destPath);
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
      file.on('error', reject);
    });
    req.on('error', reject);
    req.setTimeout(30000, () => { req.destroy(); reject(new Error('Timeout')); });
  });
}

async function uploadOne({ key, url, note }) {
  console.log(`\n  [${key}] ${note}`);
  const tmpPath = path.join(os.tmpdir(), `${key.toLowerCase()}.jpg`);
  try {
    console.log(`  ↓ Downloading...`);
    await downloadFile(url, tmpPath);
    console.log(`  ↓ Downloaded (${(fs.statSync(tmpPath).size/1024).toFixed(0)} KB)`);
    console.log(`  ↑ Uploading to Cloudinary...`);
    const result = await cloudinary.uploader.upload(tmpPath, {
      folder:        'fashion-ai/models',
      public_id:     key.toLowerCase(),
      overwrite:     true,
      resource_type: 'image',
    });
    console.log(`  ✓ ${result.secure_url}`);
    return { key, url: result.secure_url, success: true };
  } catch (err) {
    console.error(`  ✗ FAILED: ${err.message}`);
    return { key, url: null, success: false };
  } finally {
    try { if (fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath); } catch (_) {}
  }
}

async function main() {
  console.log('\n════════════════════════════════════════════');
  console.log('  Uploading FIXED Kid Model Images');
  console.log('════════════════════════════════════════════');

  const envLines = [];
  for (let i = 0; i < KID_MODELS.length; i++) {
    const r = await uploadOne(KID_MODELS[i]);
    if (r.success) envLines.push(`${r.key}=${r.url}`);
    if (i < KID_MODELS.length - 1) await sleep(800);
  }

  console.log('\n\n════════════════════════════════════════════');
  console.log('  Replace these 4 lines in your .env:');
  console.log('════════════════════════════════════════════\n');
  envLines.forEach(l => console.log(l));

  fs.writeFileSync(path.join(__dirname, 'kid_model_env.txt'), envLines.join('\n') + '\n');
  console.log('\n✅ Also saved to: kid_model_env.txt');
  console.log('   Restart server after updating .env!\n');
}

main().catch(e => { console.error('FATAL:', e.message); process.exit(1); });