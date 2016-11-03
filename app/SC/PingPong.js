// This script is for testing the ping pong request
// This script will send a ping frame and verify the pong frame structure and validations


var config=require('../../config/config.js');
var protocol=require('../protocol.js');
var log=require('../../ext/Logger');
var encode=require('../encode.js')

var n=5;

var WebSocket=require('ws');
process.env.NODE_TLS_REJECT_UNAUTHORIZED= "0";  // for handling tls error or CERT_HAS_EXPIRED error

	// making a web socket connection
module.exports=function(callback) {
var j=0;
var k=0;
	var ws=new WebSocket(config.sessionurl);

	ws.on('open',function open() {
		for(var i=0;i<n;i++) {
				setTimeout(function(){ ws.send(JSON.stringify({"v":1,"seq": ++k,"type":"ping"}));
				 },5000*i);
				//ws.send(JSON.stringify({"v":1,"seq":i,"type":"ping"}));
				//setTimeout(function(){},10);
		}

	})

	ws.on('error',function error(error) {
		log.error({err:error},'Error occurs while connecting to web socket');
		return callback(0, null, error);
	})

	ws.on('message',function(data,flags) {
		j++;
		log.info(data);
		var Data=JSON.parse(data);

		if(Data.v == 1 && Data.seq== j && Data.type == 'pong')	{
			log.info('Pass');
		}
		else 
		 {
			log.info('Fail');
			return callback(0, ws, 'pong frame is not valid' +data);
		}

	     });

	 setTimeout(
		function() {
			if(j==5){
			return callback(1, ws, null);	
			}
			else
			{
				return callback(0, ws, 'no of pong messages received is less as the no of ping requests');	
			}
		 }, 10000* (n));
	
	
}// end of function
