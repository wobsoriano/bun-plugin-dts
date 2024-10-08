import type { BuildConfig } from 'bun'
import dts from "./src/index.js"

const defaultBuildConfig: BuildConfig = {
  entrypoints: ['./src/index.ts'],
  outdir: './dist',
  minify: true,
  target: 'node',
  external: ['dts-bundle-generator', 'get-tsconfig'],
}

await Promise.all([
  Bun.build({
    ...defaultBuildConfig,
    plugins: [dts()],
    format: 'esm',
    naming: "[dir]/[name].js",
  }),
  Bun.build({
    ...defaultBuildConfig,
    // @ts-expect-error: Missing type
    format: 'cjs',
    naming: "[dir]/[name].cjs",
  })
])
