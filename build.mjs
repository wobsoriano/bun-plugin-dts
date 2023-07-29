import { dtsGenerator } from "./src/index.js"

await Bun.build({
  entrypoints: ['./src/index.ts'],
  outdir: './dist',
  minify: false,
  plugins: [dtsGenerator()],
  external: ['dts-bundle-generator']
})

