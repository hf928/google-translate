
const path = require('path');
const entryDir = 'src';

module.exports = {
    mode: 'development',
    entry: {
        bg: path.resolve(__dirname, entryDir + '/bg.js'),
        translate: path.resolve(__dirname, entryDir + '/translate.js'),
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: '[name].js'
    },
    resolve: {
        extensions: [
            '.js'
        ]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
            }
        ]
    },
    devtool: 'cheap-module-source-map'
};
