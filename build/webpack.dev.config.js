const path = require('path')
const { merge } = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.config')

const devWebpackConfig = merge(baseWebpackConfig, {
    mode: 'development',

    devtool: 'eval-cheap-module-source-map',

    devServer: {
        devMiddleware: {
            publicPath: '/'
        },
        static: {
            directory: path.join(__dirname, baseWebpackConfig.externals.paths.dist)
        }
    },

    plugins: [
    ],

    module: {
        rules:[
            {
                test: /\.(styl|css)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                config: path.resolve(__dirname, '../postcss.config.js'),
                            },
                        },
                    },
                    'stylus-loader']
            },

            {
                test: /\.(png|jpg|jpeg|svg)$/,
                type: 'asset',
            },

            {
                test: /\.(woff(2)?|ttf|eot)$/,
                type: 'asset/resource',
            },
        ]
    }
})

module.exports = new Promise((resolve) => {
    resolve(devWebpackConfig)
})
