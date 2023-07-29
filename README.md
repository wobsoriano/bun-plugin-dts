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

## License

MIT
