import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';
import {
  terser
} from 'rollup-plugin-terser';
import alias from '@rollup/plugin-alias';
import filesize from 'rollup-plugin-filesize';
import path from 'path';
import del from 'del';
import pkg from './package.json';

del.sync('dist/*')

const pathResolve = p => path.resolve(__dirname, p);

const now = new Date(
  process.env.SOURCE_DATE_EPOCH ? process.env.SOURCE_DATE_EPOCH * 1000 : new Date().getTime()
).toUTCString();

const banner = `/*
  @license
	@airmus/logger v${pkg.version}
	${now}
	https://github.com/airmus/logger
	Released under the MIT License By Fog3211.
*/`;

const treeshake = {
  moduleSideEffects: false,
  propertyReadSideEffects: false,
  tryCatchDeoptimization: false
};
const nodePlugins = [
  alias({
    resolve: ['.js', '.json', '.ts'],
    entries: {
      'src': pathResolve('@'),
      '@utils': pathResolve('src/utils')
    }
  }),
  resolve({
    extensions: ['.ts', '.js']
  }),
  json(),
  commonjs({
    include: 'node_modules/**'
  }),
  typescript(),
  filesize()
];

export default () => {
  const commonJSBuild = {
    input: 'src/index.ts',
    output: {
      banner,
      chunkFileNames: 'shared/[name].js',
      dir: 'dist/lib',
      entryFileNames: '[name].js',
      format: 'cjs',
      exports: 'auto',
      compact: true,
    },
    plugins: [
      ...nodePlugins
    ],
    treeshake,
    strictDeprecations: true,
  }
  const esmBuild = {
    ...commonJSBuild,
    output: {
      ...commonJSBuild.output,
      dir: 'dist/es',
      format: 'es',
      sourcemap: false,
      minifyInternalExports: false
    }
  }
  const browserBuilds = {
    ...commonJSBuild,
    plugins: [
      ...nodePlugins,
      resolve({
        browser: true
      }),
      terser({
        module: true,
        output: {
          comments: 'some'
        }
      })
    ],
    output: [{
      file: 'dist/logger.browser.js',
      format: 'umd',
      name: '$logger',
      banner,
      compact: true
    }]
  }

  return [commonJSBuild, esmBuild, browserBuilds];
}
