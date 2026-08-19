import fs from 'fs';
import path from 'path';

// 1x1 transparent PNG base64 string
const base64Png = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
const buffer = Buffer.from(base64Png, 'base64');

const assetsDir = path.resolve('assets');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

['icon.png', 'splash.png', 'adaptive-icon.png', 'favicon.png'].forEach(filename => {
  fs.writeFileSync(path.join(assetsDir, filename), buffer);
});

console.log('✔ Assets generated in mobile/assets/');
