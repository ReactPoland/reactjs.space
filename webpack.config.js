module.exports = {
    entry: ['babel-polyfill', './src/App.js'],
    output: {
        path: './dist',
        filename: 'app.js',
        publicPath: '/'
    },
    devServer: {
        inline: true,
        port: 3333,
        contentBase: './dist'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'stage-0', 'react']
                }
            }
        ]
    }
}