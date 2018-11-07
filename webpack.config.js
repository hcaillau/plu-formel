const path = require('path');

const options = {};

module.exports = [
    {
        entry: {pluFormel : path.resolve(__dirname, 'src/index.js')},
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'main.js',
            library : 'pluFormel',
            libraryTarget : 'umd',
            umdNamedDefine: true
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader'
                }
            ]
        },
        target: 'node',
        node: {global: true}
    }
];