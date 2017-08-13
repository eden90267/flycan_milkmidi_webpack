require( "../css/app.scss" );

// https://github.com/webpack/docs/wiki/loaders
// require("file-loader?name=app.scss!../css/app.scss");
require("!file-loader?name=app.scss!../css/app.scss");