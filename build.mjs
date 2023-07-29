import { dtsGenerator } from "./src/index.js"

await Bun.build({
  entrypoints: ['./src/index.ts'],
  outdir: './dist',
  minify: false,
  plugins: [
    dtsGenerator()
  ],
  target: 'node',
  external: ['dts-bundle-generator'],
})

