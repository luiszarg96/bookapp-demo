const path = require("path")
const HtmlWebpackplugin = require("html-webpack-plugin")
const miniCssExtractPlugin = require("mini-css-extract-plugin")

const devMode = process.env.NODE_ENV !== "production"

module.exports = {
    entry: "./frontend/app.js",
    output: {
        path: path.join(__dirname, "backend/public"),
        filename: "js/bundle.js"
    },

    mode: "production", 

    module:{
        rules:[
            {
                test: /\.css/,
                use: [
                    devMode ? "style-loader" : miniCssExtractPlugin.loader,
                    "css-loader"
                ]
            }
        ]
    },

    plugins: [
        new HtmlWebpackplugin({
            template: "./frontend/index.html", //se indica que archivo html se va a exportar a public
            minify: {
                collapseWhitespace: true, //quita todos los expacios en blanco
                removeComments: true, //quita los comentarios
                removeRedundantAttributes: true, //quita los atributos redundantes
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            }
        }),

        new miniCssExtractPlugin({
            filename: "css/bundle.css"
        })
    ],
    devtool:"source-map"

}