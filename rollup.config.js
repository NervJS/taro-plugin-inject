const { join } = require('path')
const typescript = require('rollup-plugin-typescript2')
const cwd = __dirname


const base = {
  external: ['@tarojs/shared', '@tarojs/service'],
  plugins: [typescript({
    useTsconfigDeclarationDir: true
  })]
}

const comileConfig = {
  input: join(cwd, 'src/index.ts'),
  output: {
    file: join(cwd, 'dist/index.js'),
    format: 'cjs',
    sourcemap: true,
    exports: 'named'
  },
  ...base
}

const runtimeConfig = {
  input: join(cwd, 'src/runtime.ts'),
  output: {
    file: join(cwd, 'dist/runtime.js'),
    format: 'es',
    sourcemap: true
  },
  ...base
}

const componentConfig = {
  input: join(cwd, 'src/components.ts'),
  output: {
    file: join(cwd, 'dist/components.js'),
    format: 'es',
    sourcemap: true
  },
  ...base
}

const apisConfig = {
  input: join(cwd, 'src/apis-list.ts'),
  output: {
    file: join(cwd, 'dist/apis-list.js'),
    format: 'es',
    sourcemap: true
  },
  ...base
}

module.exports = [componentConfig,apisConfig,comileConfig,runtimeConfig]