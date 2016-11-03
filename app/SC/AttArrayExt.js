// This code is used to verify all attendees info, should come in session-info frame test case

// extracts the vc_ids from the attendees array, from the session info frame, put these into an array and return this array to the test case


var config=require('../../config/config.js');
var protocol=require('../protocol.js');
var log=require('../../ext/Logger');
var encode=require('../encode');
process.env.NODE_TLS_REJECT_UNAUTHORIZED="0"
var WebSocket=require('ws');



exports.registerusers=function(id,displayName,callback)
{

	var ws=new WebSocket(config.sessionurl);  // please update the same session name in the getsessioninfo method in this file

	ws.on('error',function(error){
		log.error({err:error},'Error occurs while connecting to web socket');
		return callback(0, null, null, 'Error Occurs while connecting to websocket\n<b>'+error+'<b>');
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
			return callback(0, null, null, 'error in the following frame\n'+data+'\nFollowing error occurs\n'+ex);
				// return to mocha when test case fails
		}
		// This block is for ack frame
		if(! authenticated) {

			// this frame should be an ack frame
			//console.log(data);
			var ret = protocol.handle_auth_response (Data);
			if (ret) {
				return callback(0, null, ws, 'error in the following frame\n'+data+'\nFollowing error occurs\n'+ret);
		       	}
 			else if(Data.msg.data.id != id || Data.msg.data.displayName != displayName) {
				return callback(0, null, ws, 'ack frame- id and displayName dont match that was sent in request'+data);
			}
			else{
				//console.log("id  username   vc_id");
				log.info({"id":Data.msg.data.id,"displayName":Data.msg.data.displayName,"vc_id":Data.msg.data.vc_id},'User Info');
				vc_id=Data.msg.data.vc_id;
				authenticated=true;
				return callback(1, vc_id, ws, null);
				//console.log('ack frame recieved successfully');
			}
			    // ack frame recieved now all other frames shoule be info frames
			ack++;
		}
	});

}   // end of users module

exports.getsessioninfo=function(id,displayName,callback) {

	process.env.NODE_TLS_REJECT_UNAUTHORIZED="0"
	var WebSocket=require('ws');
	var ws=new WebSocket(config.sessionurl);

	ws.on('error',function(error){
		log.error({err:error},'Error occurs while connecting to web socket');
		return callback(0, null, null, null, 'Error Occurs while connecting to websocket\n<b>'+error+'<b>');
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
			return callback(0, null, null, ws, 'error in the following frame\n'+data+'\nFollowing error occurs\n'+ex);
				// return to mocha when test case fails
		}
		// This block is for ack frame
		if(! authenticated) {

			// this frame should be an ack frame
			//console.log(data);
			var ret = protocol.handle_auth_response (Data);
			if (ret) {
				return callback(0, null, null, ws, 'error in the following frame\n'+data+'\nFollowing error occurs\n'+ret);
		       	}
 			else if(Data.msg.data.id != id || Data.msg.data.displayName != displayName) {
				return callback(0, null, null, ws, 'ack frame- id and displayName dont match that was sent in request'+data);
			}
			else{
				//console.log("id  username   vc_id");
				log.info({"id":Data.msg.data.id,"displayName":Data.msg.data.displayName,"vc_id":Data.msg.data.vc_id},'User Info');
				vc_id=Data.msg.data.vc_id;
				authenticated=true;
				//return callback(1,vc_id,null);
				//console.log('ack frame recieved successfully');
			}
			    // ack frame recieved now all other frames shoule be info frames
			ack++;
		}
		else
		{
			var vc_ids=[];
			 if(Data.msg.info_id=="session-info"){
                                 log.info("session-info frame recieved successfully");
                                // console.log('no of users in the session is :');
                                 //console.log(Data.msg.info.attendees.length+1) ;
				//console.log('VC ID',Data.msg.info.attendees[0].vc_id);
				//console.log('VC ID',Data.msg.info.attendees[29].vc_id);
				var len=Data.msg.info.attendees.length;

				for(var i=0;i<len;i++) {

					vc_ids.push(Data.msg.info.attendees[i].vc_id);
					//vc_ids.push(Data.msg.info.attendees[i].vc_id);

					log.info(Data.msg.info.attendees[i].id +"" +Data.msg.info.attendees[i].displayName);
				}

				log.info({"length":vc_ids.length},'Lenght of array in session info frame is');
				return callback(1 , Data.msg.info.attendees.length , vc_ids, ws, null);

                        }

		}
	});



}
