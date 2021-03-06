const mix = require("laravel-mix");

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.combine(
    ["resources/js/map.js", "resources/js/script.js"],
    "public/js/script.js"
)
    .sass("resources/sass/app.scss", "public/css")
    .postCss("resources/css/css.css", "public/css")
    .postCss("resources/css/css-mobile.css", "public/css");
