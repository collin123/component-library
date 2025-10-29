import fs from 'fs';
import path from 'path';

const folder = './dist-electron';
fs.readdirSync(folder).forEach(file => {
  if (file.endsWith('.js')) {
    const oldPath = path.join(folder, file);
    const newPath = path.join(folder, file.replace('.js', '.cjs'));
    fs.renameSync(oldPath, newPath);
  }
});
console.log('✅ Renamed .js files to .cjs');
