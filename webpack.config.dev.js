const ExtractTextPlugin = require('extract-text-webpack-plugin');
const resolve = require('path').resolve;
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

module.exports = {
    devtool: 'source-map',
    entry: [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        './index',
    ],
    output: {
        path: resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    devServer: {
        hot: true,
        contentBase: resolve(__dirname),
        publicPath: '/',
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                IS_WEBPACK: JSON.stringify(true),
                NODE_ENV: JSON.stringify('development'),
                RUN_MODE: JSON.stringify('es'),
            },
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                context: __dirname,
                postcss: [
                    autoprefixer,
                ],
            },
        }),
        new SpriteLoaderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
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
        ],
    },
    externals: {
        fs: '{}',
        'https-proxy-agent': '{}',
        module: '{}',
    },
};
