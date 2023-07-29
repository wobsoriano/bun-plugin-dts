import { BunPlugin } from "bun";
import fs from 'node:fs'
import path from 'node:path'
import { CompilationOptions, type EntryPointConfig } from "dts-bundle-generator";

type Options = Omit<EntryPointConfig, 'filePath'> & {
  compilationOptions?: CompilationOptions
}

export const dtsGenerator = (options?: Options): BunPlugin => {
  return {
    name: 'bun-dts-generator',
    async setup(build) {
      const { compilationOptions, ...rest }  = options || {}
      const config: Record<string, any> = {
        compilationOptions,
        entries: build.config.entrypoints.map((entry) => {
          const dtsFile = entry.replace(/^.*\//, '').replace(/\.ts$/, '.d.ts')
          return {
            filePath: entry,
            outFile: path.join(build.config.outdir || './dist', dtsFile),
            ...rest
          }
        })
      }

      await Bun.write('./dts-config-tmp.json', JSON.stringify(config))
      const proc = Bun.spawn(['./node_modules/.bin/dts-bundle-generator', '--config', './dts-config-tmp.json'])
      await proc.exited
      fs.unlinkSync('./dts-config-tmp.json')
    }
  }
}
