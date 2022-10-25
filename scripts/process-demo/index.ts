import { spawn } from 'node:child_process'

console.log('mock', process.env.MOCK)

process.env.MOCK = '22222'

const childProcess = spawn('sh', ['-c', 'echo $MOCK'], { stdio: 'inherit' })
childProcess.on('error', (err) => {
  console.error(err)
})
