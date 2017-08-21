/* constants */
const isDev = process.env.NODE_ENV !== 'production';
const port = 3000;
const outputFolder = 'dist';

/* imports */
const path = require('path');
const webpack = require('webpack');
const NodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

let node = {
    name: 'node',
    devtool: isDev ? 'inline-sourcemap' : 'hidden-source-map',
    target: 'node',
    node: {
        __dirname: true
    },
    externals: [NodeExternals()],
    entry: [
        './app.babel.js'
    ],
    output: {
        path: __dirname,
        filename: 'app.js'
    },
    plugins: [
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'isDev': JSON.stringify(isDev),
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
                'port': JSON.stringify(port),
                'outputFolder': JSON.stringify(outputFolder)
            }
        }),
    ],
    module: {
        loaders: [{
            enforce: 'pre',
            test: /\.js$/,
            loader: 'eslint-loader',
            exclude: /node_modules/,
            options: {
                emitWarning: true
            }
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    }
};

let web = {
    name: 'web',
    devtool: isDev ? 'source-map' : 'hidden-source-map',
    externals: [NodeExternals()],
    entry: {
        'main.js': './src/js/main.js',
        'inline.css': './src/scss/inline.scss',
        'style.css': './src/scss/style.scss'
    },
    output: {
        path: path.join(__dirname, outputFolder),
        filename: '[name]'
    },
    plugins: [
        new webpack.optimize.ModuleConcatenationPlugin(),
        new CleanWebpackPlugin('./dist'),
        new ExtractTextPlugin({
            filename: `[name]`,
            allChunks: true,
        }),
        new CopyWebpackPlugin([{
            from: './src/img/',
            to: 'img/'
        }, {
            from: './src/manifest.json',
            to: './'
        }, {
            from: './src/sw.js',
            to: './'
        }]),
        new ImageminPlugin({
            test: /\.(jpe?g|png|gif|svg)$/i,
            pngquant: {
                quality: '95-100'
            }
        }),
        new StyleLintPlugin()
    ],
    module: {
        loaders: [{
            enforce: 'pre',
            test: /\.js$/,
            loader: 'eslint-loader',
            exclude: /node_modules/,
            options: {
                emitWarning: true
            }
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }, {
            test: /\.(sass|scss)$/,
            exclude: /node_modules/,
            loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader', 'postcss-loader', 'sass-loader'] })
        }, {
            test: /\.(png|jpg|svg|ico|gif|json)$/,
            loader: 'url-loader'
        }]
    }
};

// production plugins
if (!isDev) {
    node.plugins.concat([
        new webpack.optimize.UglifyJsPlugin({
            mangle: false,
            sourceMap: false
        })
    ]);

    web.plugins.concat([
        new webpack.optimize.UglifyJsPlugin({
            mangle: false,
            sourceMap: false
        }),
        new SWPrecacheWebpackPlugin({
            cacheId: 'project-name',
            filename: 'sw.js',
            minify: true,
            staticFileGlobs: [
                `/${outputFolder}/**/*.{css,js}`,
                `/${outputFolder}/img/**`
            ],
            stripPrefix: `/${outputFolder}`
        })
    ]);
}

module.exports = [node, web];
