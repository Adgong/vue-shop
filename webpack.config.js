var HtmlWebpackPlugin = require("html-webpack-plugin")
var path = require('path');
var webpack = require('webpack')
var VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    plugins: [new HtmlWebpackPlugin({
        template: "src/index.html",
        filename: "index.html"
    }), new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
    }),new VueLoaderPlugin()],
    module: {
        rules: [{
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader'], // compiles Less to CSS
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: 'url-loader?limit=54054&name=[hash:8][name].[ext]',
            },
            {
                test: /\.(ttf|eot|svg|woff|woff2)$/,
                use: 'url-loader',
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    //方法一
                    // options: {
                    //     presets: ['@babel/preset-env'],
                    //     plugins: ['@babel/plugin-proposal-class-properties']
                    // }
                }
            },
            {
                test: /\.(vue)$/,
                use: 'vue-loader',
            },
           
        ],
    },
    //也可以配置
    //   devServer:{
    //       open:true,
    //       port:4000,
    //       contentBase:"scr",
    //       hot:true
    //   }
    //别名
    // resolve:{
    //     alias:{vue$:'vue/dist/vue.js'}
    // },
    mode: 'development'
};