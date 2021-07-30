const HtmlWebPackPlugin    = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin           = require("copy-webpack-plugin");
const cssMinimizer         = require('css-minimizer-webpack-plugin');
const terser               = require('terser-webpack-plugin');

 
module.exports = {
 
    mode: 'production',
    output:{
        clean:true,//esto me limpia constantemente la carpeta dist
        filename:'main.[contenthash].js'// esto le agrega un hash al nombre del archivo js
    },
    module:{
        rules: [
            //Sirven para decirle que hacer con los distintos tipos de archivo
            {
                //Es la condición que debe cumplir, se usan expresiones regulares
                test: /\.html$/i,//me busca todos los archivos html
                loader: 'html-loader',
                options: {
                    sources: false,
                    minimize: false,
                },
            },
            {
                test:/\/.css$/i,//aplica a todos los archivos css
                exclude:/styles.css$/,//menos este
                use:['style-loader','css-loader']
            },
            {//para generar mi archivo de estilos global y tambian me instale el paq mini-css-extract-plugin
                test:/styles.css$/,
                use:[MiniCssExtractPlugin.loader,'css-loader']
            },
            {
                test:/\.(png|jpe?g|gif)$/,
                loader:'file-loader'
            },
            {
                test: /\.js$/,
                enforce: "pre",
                use: ["source-map-loader"],
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
            },
        ],
    },

    optimization:{
        minimize:true,
        minimizer:[
            new cssMinimizer(),
            new terser()
        ]
    },
    //Aquí se ejecuta la instancia que hemos creado antes para que copie el index html de la carpeta src a dist para cuando se suba a producción
    plugins:[
        new HtmlWebPackPlugin({
            template: './src/index.html',//directorio desde donde copia el archivo
            filename: 'index.html'//por si quiero renombrar el archivo html
        }),
        new MiniCssExtractPlugin({
            filename:'[name].[fullhash].css',
            ignoreOrder:false,
        }),
        new CopyPlugin({
            patterns: [
                { from: "src/assets/", to: "assets/" },
              ],
        })
    ]
 
}