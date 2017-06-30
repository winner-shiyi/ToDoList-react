const webpack = require("webpack")
const path = require("path")

module.exports = {
    entry: './src/entry.js', // 入口文件
    output: {
        filename: './dist/js/bundle.js', // 打包输出的文件
    },
    devServer: {
        port:8088,
        inline:true,
    },
    devtool: 'source-map', // 调试时定位到编译前的代码位置
    module: {
        rules: [
            {
                test: /\.js[x]?$/, // test 去判断是否为.js或.jsx,是的话就是进行es6和jsx的编译
                exclude: [path.resolve(__dirname, 'node_modules'), path.resolve(__dirname, 'src/vendor')],
                use: ['babel-loader'],
            },
            {
                test: /\.js[x]?$/,
                enforce: 'pre',
                use: [{
                    loader: 'eslint-loader', 
                    options: {configFile:'./.eslintrc.json' },
                }],
                include: path.resolve(__dirname, 'src/**/*.js'),
                exclude: [path.resolve(__dirname, 'node_modules'), path.resolve(__dirname, 'src/vendor')],
            },
        ],
    },
    resolve: {
        // 现在你import文件的时候可以直接使用import Func from './file'，不用再使用import Func from './file.js'
        extensions: ['.js', '.jsx', '.json'],
    },
    
    // plugins:[
    //     new webpack.LoaderOptionsPlugin({
    //         test: /\.js?$/,
    //         debug: false,
    //         options: {configFile:'./.eslintrc.json'},
    //     }),
    // ],
}