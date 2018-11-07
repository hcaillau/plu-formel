const path = require('path');

const options = {};

module.exports = [
    {
        entry: {pluFormel : path.resolve(__dirname, 'src/index.js')},
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
        },
        target: 'node'
    }
];