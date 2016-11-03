var request=require('request');
var fs=require('fs');

var json={};
basename=process.argv[2];
n=process.argv[3];
console.log(process.argv.length)
if(process.argv.length <4) {
console.log('Invalid Arguments');
console.log('Enter command  as\n');
console.log('node classconfig.js classbasename noofclasses');
console.log('ex is: node classconfig.js test 10');
process.exit();
}

console.log(basename);
console.log(n);
var j=0;

var output="";
for(var i=1;i<=n ;i++) {



request({
"rejectUnauthorized": false,
"url":'https://prov-vcqa.wiziq.com/prov/v1/class/'+basename+i+'/config', 
"method":"GET",

},
function(error, response, body) {
j++;
var classconfig=JSON.parse(body);

console.log(classconfig.docker.create_ts);
var className=basename + j;
json[className] = {createTime : classconfig.docker.create_ts, startTime: classconfig.docker.state.StartedAt};

output+=className;
console.log("output"+output);
if(j==n) {
console.log(i);
fs.writeFile('ab.txt',JSON.stringify(json),function(err) {

if(err) return console.log(err);
console.log('DONE');
})
}
}
);


}


