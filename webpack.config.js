const path = require('path');

// PLUGINS Y MINIFICADORES DE CSS Y SCSS/SASS
// Para reducir el tamaño de las hojas de estilo de nuestro proyecto

const HtmlWebpackPlugin = require('html-webpack-plugin'); // Para el template de html que va a usar webpack
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // Para reducir los css
const { SourceMapDevToolPlugin } = require('webpack'); // Para conocer el SourceMap de nuestro proyecto
// const { template } = require('@babel/core');
const ESLintPlugin = require('eslint-webpack-plugin');

// Configuracion del puerto

const port = process.env.port || 3000;

// Exportar configuracion de webpack

module.exports = {
    entry: './src/index.jsx',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.[hash].js',
        publicPath: '/',
    },
    context: path.resolve(__dirname),
    devServer: {
        port,
        historyApiFallback: true,
    },
    devtool: 'eval-source-map',
    module: {
        rules: [
            // Reglas para archivos de JS y JSX
            // Tienen que pasar el LINTING para poder pasar
            // {
            //     enforce: 'pre',
            //     test: /(\.js|\.jsx)$/,
            //     exclude: /node_modules/,
            //     use: [
            //         'eslint-loader',
            //         'source-map-loader',
            //     ],
            // },
            // Reglas para archivos de JS y JSX
            // Reglas de babel ES y JSX
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react',
                        ],
                    },
                },
            },
            // Reglas para archivos CSS, SCSS Y SASS para minificarlos y cargarlos en el bundle
            {
                test: /(\.css|\.scss)$/,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    { loader: 'css-loader' },
                    { loader: 'sass-loader' },
                ],
            },
            // Reglas para los archivos de imagenes
            {
                test: /(\.png|\.jpe?g|\.gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
        ],
    },
    plugins: [
        // Template HTML
        new HtmlWebpackPlugin(
            {
                template: './public/index.html',
            },
        ),
        new MiniCssExtractPlugin(
            {
                filename: './css/styles.css',
            },
        ),
        new SourceMapDevToolPlugin(
            {
                filename: '[file].map',
            },
        ),
        new ESLintPlugin(
            {
                files: './src',
            },
        ),
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.scss', '.sass'],
        modules: [
            'node_modules',
        ],
        alias: {
            'react-redux': path.join(__dirname, '/node_modules/react-redux/dist/react-redux.min'),
        },
    },
};
