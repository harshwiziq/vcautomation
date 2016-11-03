// Read data from mongodb- id and displayname of users


var mongoose=require('mongoose');

var data={};
var error=false;



console.log('inside mongodb.js');
mongoose.connect('mongodb://localhost/webrtc');

var db=mongoose.connection;
console.log('connection');
	db.on('error',function(err) {
	 		 error=err;
		console.log('db read error occurs');
	   })
	
	db.once('connected',function() {
			console.log('connected');
			var UserSchema=mongoose.Schema({
			id:String,
			displayName:String
		});

		var Users=mongoose.model('user',UserSchema);

		Users.find({},function(err,users) {
				if(err) return console.error(err);
				//console.log(JSON.stringify(kittens));
				//console.log(kittens[0].id);
				//console.log(kittens[1].id);
				//console.log(kittens[0].id);
				data.items=users;
				console.log('Data received from mongo db');
				//console.log(JSON.stringify(data));
				//console.log('data','\n',data);
				//Kitten.close();
				//db.close();
				//callback(null,data);
		    });
	});



module.exports=function(callback) {
if(error)
{
callback(error);
}
else
{
if(JSON.stringify(data) == '{}')
{
console.log('db time out called');
setTimeout( function() {
callback(null,data); },5000);
}
else {
callback(null,data);
}
}

}// end of function


