var express = require('express')(),
  qr = require('qr-image');

var packageInfo = require('./package.json');
var config = {
  "paramName": process.env['PARAM_NAME'] || 'uri',
  "uriPrefix": process.env['URI_PREFIX'] || '',
  "port": process.env['HTTP_PORT'] || 8080
};


// Only respond to requests on /
express.get('/', function (req, res) {
  // Build the URI
  var uriSuffix = (req.query[config.paramName] || '');
  var uri = config.uriPrefix + uriSuffix;

  // Generate the SVG image
  var svg_string = qr.imageSync(uri, {type: 'svg'});

  // Respond with the SVG string using the appropriate MIME type
  res.setHeader('Content-Type', 'image/svg+xml');
  res.end(svg_string);
});

// Start listening for HTTP requests
express.listen(config.port, function () {
  console.info(packageInfo.name, 'is now listening on port', config.port);
});
