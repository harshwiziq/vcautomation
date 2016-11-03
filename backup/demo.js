var fs=require('fs');
var mime=require('mime');
 

 
var path = process.argv[2];
 
fs.stat(path, function(err, stats) {
    console.log(path);
    console.log(stats);
 
    if (stats.isFile()) {
        console.log('    file');
    }
    if (stats.isDirectory()) {
        console.log('    directory');
    }
 
    console.log('    size: ' + stats["size"]);
    console.log('    mode: ' + stats["mode"]);

});
console.log(mime.lookup(process.argv[2]));
