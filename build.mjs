const entrypoint = './src/index.ts'

const result = await Bun.build({
  entrypoints: [entrypoint],
  outdir: './dist',
  minify: true,
})

if (result.success) {
  await Bun.spawn(['dts-bundle-generator', entrypoint, '-o', './dist/index.d.ts'])
}

