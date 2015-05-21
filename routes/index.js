var app = require('../app');

var routes = {};

// Path to distribution html, js and css
// Always start with ./views/ until find a way to change it in ejs
var distRoot = './views/'          // EJs views root
var distPath = distRoot + 'dist/'; // Path to distribution html, js and css

// GET home page
routes.index = function (req, res) {
    respondWith(res, 'index.html');
    //res.sendfile(distPath + 'index.html');
};

// GET normalize.css
routes.normalizecss = function (req, res) {
    res.sendfile(app.get('node_modules') + '/normalize.css/normalize.css');
};

// GET 404 page
routes.fileNotFound = function (req, res) {
    console.log("404");
    respondWith(res, 'status/404.ejs');
    //res.render('dist/status/404.ejs');
};

/**
 * filepath is assumed to start at distPath
 */
function respondWith (res, filepath, data) {
    if (isHTML(filepath)) {
        res.sendfile(distPath + filepath);
    } else {
        var pathWithRemovedEjsRoot = distPath.slice(distRoot.length, distPath.length);
        var folderPath = pathWithRemovedEjsRoot + filepath;

        data = data || {};
        res.render(folderPath, data);
    }
}

function isHTML (filepath) {
    return /\w+\.html$/.test(filepath);
}

module.exports = routes;