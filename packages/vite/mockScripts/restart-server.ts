import http from 'node:http'
import type { RequestListener } from 'node:http'
import chokidar from 'chokidar'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PORT = 3000
const configFile = path.resolve(__dirname, './config.ts')

const createServer = () => {
  const requestHandler: RequestListener = (req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(
      JSON.stringify({
        data: 'Hello World!'
      })
    )
  }
  const server = http.createServer(requestHandler)
  server.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`)
  })
  return server
}
const server = createServer()

const restartServer = () => {
  server.close()
  createServer()
}

const watcher = chokidar.watch(configFile)
watcher.on('change', (...args) => {
  console.log('args', args)
  console.log('config make changes, restarting server...')
  restartServer()
})
watcher.on('error', (error) => {
  console.log('error', error)
})
