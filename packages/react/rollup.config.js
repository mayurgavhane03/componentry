import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'es',
    preserveModules: true,
    preserveModulesRoot: 'src',
  },
  external: ['react', 'react-dom', 'react/jsx-runtime'],
  plugins: [
    resolve(),
    commonjs(),
    typescript({ tsconfig: './tsconfig.build.json' }),
  ],
};