import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import process from 'node:process';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PATH = `${path.resolve(__dirname, '../../../', './node_modules/.bin')}:${process.env.PATH}`;
const ls = spawn('sh', ['-c', '--', 'vite'], {
  env: { PATH },
  cwd: path.resolve(__dirname, '../../../playground/vue-jsx'),
  stdio: 'inherit'
});

ls.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
ls.on('error', (err) => {
  console.log('err', err);
});
