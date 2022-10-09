const fs = require('node:fs')
const path = require('node:path')

/**
 * @type {import('vite').UserConfig}
 */
module.exports = {
  esbuild: {
    supported: {
      // Force esbuild inject helpers to test regex
      'object-rest-spread': false
    }
  },
  build: {
    rollupOptions: {
      output: {
        banner: `/*!\nMayLib\n*/`
      }
    },
    lib: {
      entry: path.resolve(__dirname, 'src/main.js'),
      name: 'MyLib',
      formats: ['es', 'umd', 'iife'],
      fileName: 'my-lib-custom-filename'
    }
  },
  plugins: [
    {
      name: 'emit-index',
      generateBundle() {
        this.emitFile({
          type: 'asset',
          fileName: 'index.html',
          source: fs.readFileSync(
            path.resolve(__dirname, 'index.dist.html'),
            'utf-8'
          )
        })
      }
    }
  ]
}
