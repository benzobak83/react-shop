const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const Dotenv = require('dotenv-webpack');

const isDev = process.env.NODE_ENV == 'development'
const isProd = !isDev

console.log('isdev = ' + isDev)
module.exports = {
   
    entry: {
        main: ['@babel/polyfill', './src/js/main.js'],  // polyfyfill дополняет фичи ES
        // any: 'any.js' возможность добавления чанка(сборник скриптов)
    },
    output: {
        filename: 'js/[name].[hash].js',
        path: path.resolve(__dirname, 'dist'),
        
    },
    
    devServer: {
        port: 4200,
        hot: isDev 
    },
    optimization: { // минимизация проекта ....не работает....
        minimize: isProd,
        minimizer: [ 
            new CssMinimizerPlugin({
                exclude: /b88d04fba731603756b1.css/, // MiniCssExtractPlugin создает свой файл, который минимайзер не может прочитать, так что его нужно игнорить, но я не знаю как получать его название динамически
            }),
            
        ]
    },
    devtool: isDev ? 'source-map' : false, // может видеть код исходный, а не собранный
    plugins: [
      new Dotenv(),
        new HtmlWebpackPlugin({  // добавляем в компиляцию html
            template: path.resolve(__dirname, './src/index.html'), // указываем файл html, который будет базовым
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CleanWebpackPlugin(), // очищаем корневую папку dist от неактуальных файлов
        // new CopyWebpackPlugin({ // копируем статичные файлы
        //     patterns: [{
        //         from: path.resolve(__dirname, 'src/assets/img'),
        //         to: path.resolve(__dirname, 'dist/assets/img')
        //     },
        //     {
        //         from: path.resolve(__dirname, 'src/assets/fonts'),
        //         to: path.resolve(__dirname, 'dist/assets/fonts')
        //     },
        // ]
        // }
        // )
        new MiniCssExtractPlugin({
            filename: 'assets/css/[name].[hash].css',
        })
    ],
    module: {
        rules: [
            {
                test: /\html$/, 
                use: 'html-loader' //подгружает элементы которые указаны в html
            },
            {
                test: /\.css$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    // options:{
                    //     hmr:true // обновление на сервере без перезагрузки страницы
                    // }
                },
                  'css-loader'], // css-loader - позволяет вебпаку понимать импорты css и импортировать в js, 
                //style-loader - добавляет стили из css внутрь хеда html MiniCssExtractPlugin.loader - тоже самое что style-loader, но сжимает
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                generator: {
                    filename: 'assets/fonts/[name]-[hash][ext]',
                  },
                type: 'asset/resource', //обрабатывает шрифты
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource', //обрабатывает картинки
                generator: {
                    filename: 'assets/images/[name]-[hash][ext]',
                  }
            },
            {
                test: /\.less$/i,
                use: [
                  // компилирует Less в CSS
                  MiniCssExtractPlugin.loader,
                  "css-loader",
                  "less-loader",
                ],
              },
              {
                test: /\.m?jsx?$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-react'],
                    plugins: ['@babel/plugin-proposal-class-properties'] //понимает синтаксис нововведений ES
                  }
                }
              },
              {
                test: /\.s[ac]ss$/i,
                use: [
                  // Creates `style` nodes from JS strings
                  "style-loader",
                  // Translates CSS into CommonJS
                  "css-loader",
                  // Compiles Sass to CSS
                  "sass-loader",
                ],
              },
              {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env', '@babel/preset-typescript'],
                    plugins: ['@babel/plugin-proposal-class-properties'] //понимает синтаксис нововведений ES
                  }
                }
              }
        ]
    }
}

