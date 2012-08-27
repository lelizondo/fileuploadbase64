This small module is based on https://github.com/domharrington/fileupload

The main reason was not to replace fileupload but to complement it. File upload works great and is one of the easiest modules to upload files, specially when used with Express JS

This module will take a Base64 encoded image and write the image to the filesystem. It will return the same file structure as fileupload. I did this because I'm using fileupload and I needed the result object to look the same to avoid handling different result objects.

# Install
npm install fileuploadbase64

# Usage
var fileuploadbase64 = require("fileuploadbase64");

Params:
file = the string from the encoded image
directory = destination directory to save files, don't add / at the end

Example:

var directory = './public/files';
fileuploadbase64(file, directory, function(error, result) {
  // do something with the result file object
});

## File object
The file object will be something like:

{
   size: 3909,
   type: 'image/png',
   path: 'b36e7d8a26e5dac9be9d9a5ad76cedb5/',
   basename: 'test1.png'
}

### Limitations
Right now it is hard-coded into the module the image extension, it will only create PNG files.

### License
GNU Public License Version 3
http://www.gnu.org/copyleft/gpl.html
