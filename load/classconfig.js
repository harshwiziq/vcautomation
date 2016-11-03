var request=require('request');
var fs=require('fs');

var json={};
hostname=process.argv[2]
basename=process.argv[3];
n=process.argv[4];
console.log(process.argv.length)
if(process.argv.length <5) {
console.log('Invalid Arguments');
console.log('Enter command  as\n');
console.log('node classconfig.js hostname classbasename noofclasses');
console.log('ex is: node classconfig.js prov-load.wiziq.com test- 10');
process.exit();
}

console.log(basename);
console.log(n);
var j=0;

var output="";
for(var i=1;i<=n ;i++) {



	request({
		"rejectUnauthorized": false,
		"url":'https://'+hostname+'/prov/v1/class/'+basename+i+'/config', 
		"method":"GET",

		},
		function(error, response, body) {
			j++;
			//console.log('body'+body);
			var className=basename + j;
			output+=className;
                        output+='\t';

			if(error) {
					console.log('error occurs'+error);
					console.log('body is'+body);
					output+='error occurs\t'+error;
					
			}

			else if(body == 'Not found'){
				console.log('Class is expired body is coming Not found');
				output+='class is expired body is coming Not Found';
			}
			else
			{
			var classconfig=JSON.parse(body);
			//console.log('state scheduled is'+classconfig.state);
			if(classconfig.state =='scheduled') {
				console.log('class is not provisioned yet');
				output+='class is not provisioned yet';
			}
			if(classconfig.state=='started') {
				console.log('class is started');
				 output+=classconfig.docker.create_ts;
	                         output+='\t';
        	                 output+=classconfig.docker.state.StartedAt;

			}
			
			//var className=basename + j;
			//json[className] = {createTime : classconfig.docker.create_ts, startTime: classconfig.docker.state.StartedAt};
			
	
			}
			output+='\n';
			//console.log("output\n"+output);
			if(j==n) {
				fs.writeFile('./testoutput/'+basename+'.txt',output,function(err) {

					if(err) return console.log(err);
					console.log('DONE');
				})
			}
		}
	);


}


