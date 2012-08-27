var fs = require('fs')
  , path = require('path')
  , async = require('async')
  , crypto = require('crypto')
  , mime = require('mime')
  ;

module.exports = function(file, uploadDir, next) {  
  async.waterfall([
    function(callback) {
      fs.stat(uploadDir, function(error) {
        // Deliberately passing error to next function for checking
        callback(null, error);
      });
    },
    function(error, callback) {
      if (error && error.code === 'ENOENT') {
        fs.mkdir(uploadDir, '0755', function(error) {
          callback(error);
        });
      }
    }
  ], function(error) {
    if (error) {
      throw error;
    }
  });

  var name = ""; 

  // Creates a random folder name
  for (var i = 0; i < 32; i++) {
    name += Math.floor(Math.random() * 16).toString(16);
  }

  fs.mkdir(path.join(uploadDir, name), '0755', function(error) {
    var destPath = path.join(uploadDir, name, name + ".png");

    fs.writeFile(destPath, new Buffer(file, "base64"), function(err) {
      if(err) {
        return err;
      }

      fs.stat(destPath, function(error, stats) {
        if (error && error.code === 'ENOENT') {
          return next(error, null);
        }

        size = stats.size;
        readfile = fs.createReadStream(destPath);
        fileType = mime.lookup(destPath);
        readfile.name = path.basename(readfile.path);
        readfile.type = fileType;
        readfile.size = size;

        var file = {
          size: readfile.size,
          type: readfile.type,
          path: name + '/',
          basename: readfile.name
        };

        next(null, file);
      });
    });
  });
};