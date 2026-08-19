import fs from 'fs';
import path from 'path';
import { createCanvas } from 'canvas';

// Helper to render high resolution cyberpunk IEIH logo PNGs
function generateIcon(size, isSplash = false) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Dark Void Background
  ctx.fillStyle = '#07070D';
  ctx.fillRect(0, 0, size, size);

  // Background Cyber Grid lines
  ctx.strokeStyle = 'rgba(0, 240, 255, 0.08)';
  ctx.lineWidth = Math.max(1, size / 200);
  const step = size / 16;
  for (let x = 0; x <= size; x += step) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, size);
    ctx.stroke();
  }
  for (let y = 0; y <= size; y += step) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(size, y);
    ctx.stroke();
  }

  // Radial Ambient Glow
  const glow = ctx.createRadialGradient(size / 2, size / 2, size * 0.1, size / 2, size / 2, size * 0.45);
  glow.addColorStop(0, 'rgba(0, 240, 255, 0.35)');
  glow.addColorStop(0.5, 'rgba(139, 92, 246, 0.2)');
  glow.addColorStop(1, 'transparent');
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size * 0.45, 0, Math.PI * 2);
  ctx.fill();

  // Cyber Hexagon / Shield Polygon
  const cx = size / 2;
  const cy = isSplash ? size * 0.42 : size / 2;
  const r = size * 0.3;

  ctx.strokeStyle = '#00F0FF';
  ctx.lineWidth = size * 0.025;
  ctx.shadowColor = '#00F0FF';
  ctx.shadowBlur = size * 0.04;

  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i - Math.PI / 6;
    const px = cx + r * Math.cos(angle);
    const py = cy + r * Math.sin(angle);
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.stroke();

  // Inner Shield Emblem (T shape for Tactical / Trophy)
  ctx.fillStyle = '#00F0FF';
  ctx.shadowColor = '#00F0FF';
  ctx.shadowBlur = size * 0.05;

  const tw = r * 0.7;
  const th = r * 0.15;
  ctx.fillRect(cx - tw / 2, cy - r * 0.4, tw, th);

  const bw = r * 0.2;
  const bh = r * 0.7;
  ctx.fillRect(cx - bw / 2, cy - r * 0.4, bw, bh);

  // Text Branding "IEIH"
  ctx.shadowBlur = size * 0.03;
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `bold ${Math.round(size * 0.12)}px sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  if (isSplash) {
    ctx.fillText('IEIH ESPORTS', cx, cy + r * 1.3);
    ctx.fillStyle = '#00F0FF';
    ctx.font = `semibold ${Math.round(size * 0.04)}px sans-serif`;
    ctx.fillText('INDIA ESPORTS INNOVATION HUB', cx, cy + r * 1.55);
  } else {
    ctx.fillText('IEIH', cx, cy + r * 0.02);
  }

  return canvas.toBuffer('image/png');
}

const assetsDir = path.resolve('assets');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

fs.writeFileSync(path.join(assetsDir, 'icon.png'), generateIcon(1024));
fs.writeFileSync(path.join(assetsDir, 'adaptive-icon.png'), generateIcon(1024));
fs.writeFileSync(path.join(assetsDir, 'splash.png'), generateIcon(1242, true));
fs.writeFileSync(path.join(assetsDir, 'favicon.png'), generateIcon(256));

console.log('✔ High-resolution Cyberpunk IEIH logo PNG assets created in mobile/assets/');
