# bun-plugin-dts

A Bun plugin for generating `.d.ts` files.

## Install

```bash
bun install bun-plugin-dts
```

## Usage

```ts
import dts from 'bun-plugin-dts'

await Bun.build({
  entrypoints: ['./src/index.ts'],
  outdir: './dist',
  plugins: [
    dts()
  ],
})
```

If you have multiple entrypoints, it's required to specify a preferred tsconfig file:

```ts
await Bun.build({
  entrypoints: ['./src/index.ts', './src/other.ts'],
  outdir: './dist',
  plugins: [
    dts({
      compilationOptions: {
        preferredConfigPath: './tsconfig.json'
      }
    })
  ],
})
```

This plugin utilizes [dts-bundle-generator](https://github.com/timocov/dts-bundle-generator) internally, allowing you to easily customize its behavior by passing specific options for dts-bundle-generator.

## License

MIT
