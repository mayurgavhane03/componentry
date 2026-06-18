import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'es',
    },
    {
      file: 'dist/index.cjs.js',
      format: 'cjs',
    },
  ],
  external: ['vue', '@componentry-ui/stencil'],
  plugins: [
    resolve(),
    typescript({ tsconfig: './tsconfig.json', declarationDir: 'dist/types' }),
  ],
};