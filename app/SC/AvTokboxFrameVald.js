// this code is used for verifying full av-tokbox-v2 frame structure and validations


var config=require('../../config/config.js');
var protocol=require('../protocol.js');
var log=require('../../ext/Logger');
var encode=require('../encode');

module.exports=function(id,displayName,callback)
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
		/*
                var dat={};
                dat.id=id;
                dat.displayName=displayName;
                var dt=JSON.stringify(dat);
                var encodeddt=encodeURIComponent(dt);
                
                var m = {};
                m.v     = 1;
                m.type  = 'req';
                m.to    = 'controller.auth';
                m.from  = 'user:-not-yet-authenticated-';
                m.msg  = {
                        command : 'authenticate-me',
                        data    : encodeddt
                };
                m.seq = 0;
                
                var m= config.m;
                m.msg.data= encodeddt;
                
                var data={"v":1,"type":"req","to":"controller.auth","from":"user:-not-yet-authenticated-",
                "msg":{"command":"authenticate-me","data":"%7B%22id%22%3A%22Kk%22%2C%22displayName%22%3A%22JJ%22%7D"},"seq":0};
                */
		user = {
                        "id":id,
                         "displayName":displayName
                }
                var identity  = encode.create_identity(user,'anon');
                config.eid.msg.data.e_identity = identity;
                ws.send(JSON.stringify(config.eid));  //sending a req frame after making a websocket connection


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
				return callback(0, ws, 'error in the following frame\n'+data+'\nFollowing error occurs\n'+ret);
		       	}
 			else if(Data.msg.data.id !== id || Data.msg.data.displayName !== displayName) {
				return callback(0, ws, 'ack frame- id and displayName dont match that was sent in request'+data);
			}
			else{
				//console.log("id  username   vc_id");
				log.info({"id":Data.msg.data.id,"displayName":Data.msg.data.displayName,"vc_id":Data.msg.data.vc_id},'User Info');
				vc_id=Data.msg.data.vc_id;
				//console.log('ack frame recieved successfully');
			}

		}
	// this block is for info frames
		else {

			//console.log("info frame is received at user end");

			if(Data.msg.info.name=="av-tokbox-v2"){
  			  	//console.log("av-tokbox-v2 frame is there");
				 av++;
				 if(! protocol.addressed_to_me(Data.to,vc_id)){
                                	return callback(0, ws, 'addresses to me - vc_id is not matching in the following frame\n'+data);
                         	 }
			 	 var vtype=protocol.handle_info_frame(Data);
                                 if(vtype) {
                                               return callback(0, ws, vtype+'in the following frame'+data)
                                  }

				  if( Data.from !== 'user-controller') {
                                                return callback(0, ws, 'this frame is not coming from user-controller\n'+data);
                                        }


				if(Data.msg.info.status !== 'ok') {
					 return  callback(0, ws, 'av tokbox frame status is not ok\n'+data);
				}

				else {
					if(Data.msg.info.info.username !== vc_id) {
						return callback(0, ws, 'username in av tokbox frame is not matching vc_id that was extracted from ack frame\n'+data);
				  	}
					else{
						callback(1, ws, null);
					}
				     }
			}

		}

	});




}
