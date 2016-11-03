// This code is used for verifying the Authentication (anony, google and facebok)

// recieved the req frame from the test case and send it on web socket connection and verify the ack frame, status should be ok 

var config=require('./../../config/config.js');
var protocol=require('../protocol.js');
var log=require('../../ext/Logger');
var encode=require('../encode');

module.exports=function(frame,callback)
{

	process.env.NODE_TLS_REJECT_UNAUTHORIZED="0"
	var WebSocket=require('ws');
	var ws=new WebSocket(config.sessionurl);
	
	ws.on('error',function(error){
                log.error({err:error},'Error occurs while connecting to web socket');
                return callback(0, null, 'Error Occurs while connecting to websocket\n<b>'+error+'<b>');
        });

	ws.on('open',function open() {
		// web socket connection is open now
		ws.send(frame);  //sending a req frame after making a websocket connection
	});

	var authenticated=false;  // this var is used for in response first frame should be ack frame, once ack frame recieved we update it to true
	var vc_id=null;
	var ack=0,av=0,chat=0,si=0; 

	ws.on('message', function(data,flags) {    
					// frame is recieved on web socket

		try {
			Data=protocol.parse(data);
		}
		catch(ex) {
			return callback(0, ws,'error in the following frame\n'+data+'\nFollowing error occurs\n'+ex); 
				// return to mocha when test case fails 
		}
		// This block is for ack frame
		if(! authenticated) { 
			
			// this frame should be an ack frame
			ack++;	
			authenticated=true;     // ack frame recieved now all other frames shoule be info frames
		 	var ret = protocol.handle_auth_response (Data);   
			if (ret) {
				return callback(0, ws,'error in the following frame\n'+data+'\nFollowing error occurs\n'+ret);
		       	}
			else{
				log.info({"id":Data.msg.data.id,"displayName":Data.msg.data.displayName,"vc_id":Data.msg.data.vc_id},'User Info');
				vc_id=Data.msg.data.vc_id;
				return callback(1,ws,null);
				//console.log('ack frame recieved successfully');
			}
			
		}
	// this block is for info frames		
	});



}
