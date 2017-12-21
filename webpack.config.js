var path = require('path');

module.exports = {
    entry: './src/index',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'allye.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            }
        ]
    }
};
