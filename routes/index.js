var app = require('../app');

var routes = {};

// Path to distribution html, js and css
var distPath = './views/dist/';

// GET home page
routes.index = function (req, res) {
    res.sendfile(distPath + 'index.html');
};

// GET normalize.css
routes.normalizecss = function (req, res) {
    res.sendfile(app.get('node_modules') + '/normalize.css/normalize.css');
};

// GET 404 page
routes.fileNotFound = function (req, res) {
    res.render('dist/status/404.ejs');
};

/**
 * [getPath description]
 * @return {[type]} [description]
 */
function getPath () {

}

module.exports = routes;