// 生成 Capacitor 需要的 www/ 目录。
// 仓库根目录就是 Pages 站点，这里把同一份页面复制过去，保证网页版与 APK 完全一致。
import { mkdirSync, copyFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const www = join(root, 'www');
mkdirSync(www, { recursive: true });

const files = ['index.html', 'manifest.json', 'sw.js', 'icon.svg'];
for (const f of files) {
  copyFileSync(join(root, f), join(www, f));
}

console.log('www/ ready:', files.join(', '));
