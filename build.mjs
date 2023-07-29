import { dtsGenerator } from "./src/index.js"

const result = await Bun.build({
  entrypoints: ['./src/index.ts', './src/other.ts'],
  outdir: './dist',
  minify: false,
  plugins: [dtsGenerator({
    compilationOptions: {
      preferredConfigPath: './tsconfig.json'
    }
  })],
  external: ['dts-bundle-generator', 'node:fs', 'node:path', 'bun']
})

