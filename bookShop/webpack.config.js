const path = require('path');
module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use:{
                    loader: "babel-loader"
                }
            }
        ]
    },
    output: {
     filename: 'main.js',
     path: path.resolve(__dirname, 'frontend/static/frontend')
   },
}