// This code is used to verify the following test case

// verify a file, get a tmp url for a file, upload it on amazon s3, start conversion, conversion should be successfull

var fs=require('fs'); //file manipulation
var request=require('request'); //making http requests
var path=require('path'); //OS agnostic paths
var mime= require('mime'); //handling file types
var log=require('../../ext/Logger'); //logging
var config=require('../../config/config.js'); //suite level configuration
var protocol=require('../protocol.js'); //parsing the json structure.
var path=require('path');

var exec=require('child_process').exec;
var encode=require('../encode');


module.exports=function(id, displayName, fileName, callback)
{

	var WebSocket=require('ws');
	process.env.NODE_TLS_REJECT_UNAUTHORIZED="0";
	//log.info({"fileExtension":fileExtension},'file extension is')
	//log.info({"fileType":fileType},'file type is');
	if(fs.existsSync(__dirname+path.sep+'Data'+path.sep+fileName)) {

	//	log.info('file exists');
		var ws=new WebSocket(config.sessionurl);
	}
	else {

		log.info("file doesn't exist");
		return callback(0, null, 'File not exist');
	}

	ws.on('error',function(error){

		log.error({err:error},'Following error occurs while connecting to web socket');
		return callback(0,null,'Error Occurs while connecting to websocket\n<b>'+error+'<b>');
	});

	ws.on('open',function open() {		// web socket connection is open now

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
	var l=1;

	ws.on('message', function(data,flags) {    // frame is recieved on web socket

		try {
			Data=protocol.parse(data);
		}
		catch(ex) {
			return callback(0, ws,'error in the following frame\n'+data+'\nFollowing error occurs\n'+ex);
		// return to mocha when test case fails
		}

		if(! authenticated) {

			// This block is for ack frame
			// this frame should be an ack frame
			ack++;
			authenticated=true;     // ack frame recieved now all other frames shoule be info frames
			var ret = protocol.handle_auth_response (Data);
			if (ret) {
				return callback(0, ws,'error in the following frame\n'+data+'\nFollowing error occurs\n'+ret);
			}
			else if(Data.msg.data.id !== id || Data.msg.data.displayName !== displayName) {
				return callback(0, ws,'ack frame- id and displayName dont match that was sent in request'+data);
			}
			else {
				log.info({"id:":Data.msg.data.id,"displayName: ":Data.msg.data.displayName,"vc_id: ":Data.msg.data.vc_id}, 'User Info');
				vc_id=Data.msg.data.vc_id;
			}
		}

		else {   // this block is for info frames

			if(! protocol.addressed_to_me(Data.to,vc_id)){
				return callback(0, ws, 'vc_id is not matching in the following frame\n'+data);
			}
			if(Data.msg.info_id=="session-info") {
				si++;
			}

			if(Data.msg.info && Data.msg.info.name=="av-tokbox-v2") {
				av++;
			}

	if(Data.msg.info && Data.msg.info.name=="chat-box"){

		chat++;
		if(ack !== 1) {       //ack frame is not recieved but some info packet is rec
			return callback(0, ws, 'ack frame is not recieved');
		}
		else if(si !==1) {    // sess-info frame is not recieved but chat frame is recieved
			return callback(0, ws, 'session info frame is not recieved');
		}
		else if(av !==1) {     // av-tokbox frame is not recieved
			return callback(0, ws, 'av-tokbox frame is not recieved');
		}
		else {

	}    // end of chat box

	if(Data.msg.info_id=="johnny-go-went-gone"){   //user leaves the session

		//console.log("User leaves the session");
	}

	if(Data.msg.info_id=="new-johnny"){    // new user joins the session

		//console.log("New User Comes into the session");
	}
	} // end of chat-box frame
	if(Data.from=="content") {    // All frames that are related to content but only in conversion processs


	    }       // end of content block
	if(Data.msg.info_id=="new-content"){   //user leaves the session

                // new-content is received

		log.info('new-content frame received at other user end \n'+JSON.stringify(Data));
		return callback(1, ws, null);

        }

	if(Data.msg.info_id=="tab-now-showing"){   //user leaves the session

                //console.log("User leaves the session");
		log.info('tab-now-showing frame received at other user end\n'+JSON.stringify(Data));
        	return callback(1, ws, null)
	}
	if(Data.msg.info_id=="scroll-to") {

		log.info('scroll-to frame received at other user end\n'+JSON.stringify(Data));
		return callback(1, ws, null);

	}
	if(Data.msg.info_id=="navigate-to") {

		log.info('navigate-to frame received at other user end\n'+JSON.stringify(Data));
		return callback(1, ws, null);

	}
	if(Data.msg.info_id=="pointer-event") {

		if(Data.msg.info.ev_type=="pointer-moved") {
			log.info("'pointer-event/pointer-moved' frame received at other user end\n"+JSON.stringify(Data));
			return callback(1, ws, null);
		}
		if(Data.msg.info.ev_type=="pointer-leave") {
			log.info("'pointer-event/pointer-leave' frame received at other user end\n"+JSON.stringify(Data));
			return callback(1, ws, null);
		}
		if(Data.msg.info.ev_type=="pointer-enter") {
			log.info("'pointer-event/pointer-enter' frame received at other user end\n"+JSON.stringify(Data));
			return callback(1, ws, null);
		}

	}


	} // end of else part of frame category (info frames)

	}); //    end of  ws.on(message method
} // end of module.exports method
