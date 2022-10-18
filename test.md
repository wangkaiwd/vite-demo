## Notes

- [package exports](https://webpack.js.org/guides/package-exports/)

### start vite

What happen when execute `npm run start` ?

### Why Npm Command Can Execute

First, We will encounter first problem: Why npm command can execute ?

When we install `node.js`, it will auto put directory pathname which store npm in `PATH` string.`PATH` is an environment
variable , filename in it's directories list can execute directly in terminal.

At the same time, `npm` is a soft link, and its actual location as following:

- npm run start -> `npmcli.js` run start
- which will execute following code in `npmcli.js`:

```shell
spawn('sh',['-c','--','vite'],{ env: { PATH: '/some/path/node_modules/.bin:/some/node_modules/.bin:...recursive_parent/node_modules/.bin:...other directories' } })
```

Eventually, actually executed command is `sh -c -- /some/path/node_modules/.bin/vite`. `node_modules/.bin/vite` will
execute `packages/vite/bin/vite.js` to run `vite` package compiled source code.

### architecture

- development
  - dev
  - playground
  - build
  - debug
  - test
  - document
- publish
  - release

### package

execute `ts` scripts: `tsx`

build:

- rollup
- unbuild
- api-extractor

cli:

- picocolors
- cac

others:

- npm-run-all
- tsx
- simple-git-hooks

### commit code

- [conventional commit example](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular)
