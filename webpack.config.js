const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const options = {};

module.exports = [
    {
        entry: 'src/index.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'main.js'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/
                }
            ]
        }
    }
];