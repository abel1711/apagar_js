const HtmlWebPackPlugin    = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin           = require("copy-webpack-plugin");

 
module.exports = {
 
    mode: 'development',
    output:{
        clean:true,//esto me limpia constantemente la carpeta dist
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
                test:/\/.css$/i,
                exclude:/styles.css$/,
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
        ],
    },
    //Aquí se ejecuta la instancia que hemos creado antes para que copie el index html de la carpeta src a dist para cuando se suba a producción
    plugins:[
        new HtmlWebPackPlugin({
            template: './src/index.html',//directorio desde donde copia el archivo
            filename: 'index.html'//por si quiero renombrar el archivo html
        }),
        new MiniCssExtractPlugin({
            filename:'[name].css',
            ignoreOrder:false,
        }),
        new CopyPlugin({
            patterns: [
                { from: "src/assets/", to: "assets/" },
              ],
        })
    ]
 
}