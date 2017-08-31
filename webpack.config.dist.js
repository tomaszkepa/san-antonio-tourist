const ExtractTextPlugin = require('extract-text-webpack-plugin');
const resolve = require('path').resolve;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

module.exports = {
    devtool: 'source-map',
    entry: [
        './src/main/index',
    ],
    output: {
        path: resolve(__dirname, 'dist', 'www'),
        filename: 'bundle.js',
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                IS_WEBPACK: JSON.stringify(true),
                NODE_ENV: JSON.stringify('production'),
                RUN_MODE: JSON.stringify('es'),
            },
        }),
        new CleanWebpackPlugin(['dist/www'], {
            root: __dirname,
        }),
        new CopyWebpackPlugin([{
            from: resolve(__dirname, 'index.html'),
            to: resolve(__dirname, 'dist', 'www', 'index.html')
        }]),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: true,
            options: {
                context: __dirname,
                postcss: [
                    autoprefixer,
                ],
            },
        }),
        new SpriteLoaderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            mangle: true,
            compress: {
                warnings: true,
                screw_ie8: true,
                conditionals: true,
                unused: true,
                comparisons: true,
                sequences: true,
                dead_code: true,
                evaluate: true,
                if_return: true,
                join_vars: true,
            },
            output: {
                comments: false,
            },
        }),
        new ExtractTextPlugin('styles.css'),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: resolve(__dirname),
                exclude: /node_modules/,
            },
            {
                test: /\.*css$/,
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: 'css-loader!postcss-loader!sass-loader',
                }),
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: 'svg-sprite-loader',
                        options: {
                            extract: true,
                        },
                    },
                    {
                        loader: 'svgo-loader',
                        options: {
                            plugins: [
                                { removeTitle: true },
                                { convertColors: { shorthex: false } },
                                { convertPathData: false },
                            ],
                        },
                    },
                ],
            },
            {
                test: /\.icons\.(js|json)$/,
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: 'css-loader!postcss-loader!sass-loader!webfonts-loader',
                }),
            },
            {
                test: /\.(png|jpg|eot|woff|woff2|ttf)$/,
                loader: 'file-loader?',
            },
            {
                test: /\.(txt)$/,
                loader: 'raw-loader',
            },
            {
                test: /\.ico$/,
                loader: 'file-loader?name=[name].[ext]',
            },
        ],
    },
    externals: {
        fs: '{}',
        'https-proxy-agent': '{}',
        module: '{}',
    },
};
