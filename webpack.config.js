const webpack   = require('webpack');
const path      = require('path');
const banner    = require('./tasks/banner');
const config    = require('./project.config');

const TARGET            = config.target.env;
const MAIN_ENTRY        = path.join(__dirname, config.dir.built, config.main.basename + '.js');
const OUTPUT_PATH       = path.join(__dirname, config.dir.pkg);
const OUTPUT_FILE_NAME  = config.main.basename + '.js';
const OUTPUT_LIB_TARGET = ('commonjs' === config.target.module) ? 'commonjs2' : config.target.module;

module.exports = {
    target: TARGET,
    entry: [
      MAIN_ENTRY,
    ],
    output: {
        path: OUTPUT_PATH,
        filename: OUTPUT_FILE_NAME,
        libraryTarget: OUTPUT_LIB_TARGET,
    },
    node: {
        __dirname: false,
        __filename: false,
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ["source-map-loader"],
                enforce: "pre",
            },
        ],
    },
    externals: {
        // external module defs here:
        'fs-extra': {
            commonjs: 'fs-extra',
            commonjs2: 'fs-extra',
        },
        'jquery': {
            root: 'jQuery',
            commonjs: 'jquery',
            commonjs2: 'jquery',
            amd: 'jquery'
        },
        'hogan.js': {
            root: 'Hogan',
            commonjs: 'hogan.js',
            commonjs2: 'hogan.js',
            amd: 'hogan.js'
        },
        'jsdom': {
            commonjs: 'jsdom',
            commonjs2: 'jsdom',
        },
        'xmldom': {
            commonjs: 'xmldom',
            commonjs2: 'xmldom',
        },
        'glob': {
            commonjs: 'glob',
            commonjs2: 'glob',
        },
        'lodash': {
            root: '_',
            commonjs: 'lodash',
            commonjs2: 'lodash',
        },
        'uuid': {
            commonjs: 'uuid',
            commonjs2: 'uuid',
        },
        'semver-regex': {
            commonjs: 'semver-regex',
            commonjs2: 'semver-regex',
        },
        'underscore.string': {
            root: '_',
            commonjs: 'underscore.string',
            commonjs2: 'underscore.string',
        },
        'which': {
            commonjs: 'which',
            commonjs2: 'which',
        },
        'chalk': {
            commonjs: 'chalk',
            commonjs2: 'chalk',
        },
        'cli-spinner': {
            commonjs: 'cli-spinner',
            commonjs2: 'cli-spinner',
        },
    },
    plugins: [
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1,
        }),
        new webpack.BannerPlugin({
            banner: banner('.js'),
            raw: true,
            ntryOnly: true,
        }),
    ],
};
