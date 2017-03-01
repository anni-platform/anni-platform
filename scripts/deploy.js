var ghpages = require('gh-pages');
var path = require('path');
var paths = require('../config/paths');
var folder = path.join(paths.appBuild);

ghpages.publish(folder, function(err) {
  if (err) {
    console.log("Error Deploying", err);
  }
});
