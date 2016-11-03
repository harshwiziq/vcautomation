// This code is used to verify the following test case

// verify a file, get a tmp url for a file, upload it on amazon s3, start conversion, conversion should be successfull

var fs=require('fs'); //for uploading files.
var request=require('request'); //for making http requests
var path=require('path'); //for managing OS independent filesystem paths
var mime= require('mime'); //for handling file mime types.
var log=require('../../ext/Logger'); //for logging
var config=require('../../config/config.js'); //for test suite session configuration.
var protocol=require('../protocol.js'); //for verifying the frame structure.
var path=require('path');

var exec=require('child_process').exec;

var encode=require('../encode');


module.exports=function(id, displayName, fileName, callback)
{

	var WebSocket=require('ws');
	process.env.NODE_TLS_REJECT_UNAUTHORIZED="0"; //for handling ssl errors
	log.info({"fileName":fileName},'file name is'); //for logging
	var fileType=mime.lookup(fileName); //determine filetype
	var fileSize=0;
	var fileExtension=null;
	var encodedFilename=encodeURIComponent(fileName); //javascript function to encodefilename
	encodedFilename=fileName;// comment this after debugging
	log.info({"encodedFilename":encodedFilename},'encoded file name is');

/**find the filename extension**/

	var arr=fileName.split('.');
	var len=arr.length;
	var fileExtension=arr[len-1];
	var access_url;
	log.info({"fileExtension":fileExtension},'file extension is')
	log.info({"fileType":fileType},'file type is');

//check if the test files exist in the Data folder. if it does then only create websocket.

	if(fs.existsSync(__dirname+path.sep+'Data'+path.sep+fileName)) {

		log.info('file exists');
		var ws=new WebSocket(config.sessionurl);
	}
	else {
		log.info("file doesn't exist");
		return callback(0, null, 'File does not exist');
	}

//Get the stats of the 'filename' passed by test.
	fs.stat(__dirname+path.sep+'Data'+path.sep+fileName, function(err, stats) {

		fileSize=stats["size"];
		log.info({"fileSize":fileSize},'file size is');
	});

//Handle any websocket error.
	ws.on('error',function(error){

		log.error({err:error},'Following error occurs while connecting to web socket');
		return callback(0,null,'Error Occurs while connecting to websocket\n<b>'+error+'<b>');
	});

//Handle what to do on opening websocket connection.
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
			frame=JSON.stringify({"v":1,"seq":21,"type":"req","to":"content","from":"user:"+vc_id+".content:0","msg":{"command":"get-tmp-url","data":{"path":"/vctemp/"+encodedFilename,"name":fileName,"type":fileType,"user_id":"test@wiziq.com"}}});
			log.info('get-tmp-url request is sent\n'+frame);
			ws.send(frame);

	}    // end of chat box

	if(Data.msg.info_id=="johnny-go-went-gone"){   //user leaves the session

		//console.log("User leaves the session");
	}

	if(Data.msg.info_id=="new-johnny"){    // new user joins the session

		//console.log("New User Comes into the session");
	}
	} // end of chat-box frame
	if(Data.from=="content") {    // All frames that are related to content but only in conversion processs

	if(l==1) {     // response of get-temp-url frame

		if(Data.msg.status !== 'ok') {
			log.error({"Frame":JSON.stringify(Data)},'status of get-tmp-url frame is not-ok');
	                return callback(0,ws,'Status of get-tmp-url frame is not ok\n<b>'+JSON.stringify(Data)+'<b>');
		}
		log.info('response of get-temp-url\n'+JSON.stringify(Data));
		log.info('Access URL\n'+Data.msg.data.access_url);
		access_url=Data.msg.data.access_url;
		var filePath=(__dirname+path.sep+fileName);
		console.log('FILE PATH IS'+filePath);

		function uploadfile(url, fileName) {
			var options = { method: 'PUT',
				url: url,
				headers:
				{
				'content-type': fileType
				},
				body: fs.readFileSync(__dirname+path.sep+'Data'+path.sep+fileName)
			        };

			request(options, function (error, response, body) {

				log.info('response of request put call is\n'+JSON.stringify(response));
				if (error || response.statusCode!==200) {
					log.error('ERROR OCCURS while uploading file to amazon S3 in request command\n'+error);
					callback(0, ws, 'following error occurs while executing request upload command'+error+"\nresponse is"+response);
				}
				else {
					log.info('File uploaded successfully');
					frame=JSON.stringify({"v":1,"seq":11,"type":"req","to":"content","from":"user:"+vc_id+".content:0","msg":{"command":"upload_complete","data":{"path":"/vctemp/"+encodedFilename,"name":fileName,"type":fileType,"size":fileSize,"url":access_url,"user_id":"test@wiziq.com","vc_id":vc_id,"u_name":"a","removeafter":3600,"tags":"content, "+fileExtension}}});
					log.info('upload_complete frame is sent\n'+frame);
					ws.send(frame);
				}
			});
		}
		uploadfile(Data.msg.data.upload_url, fileName);
	}

	if(l==2) {    // response of upload_complete frame

	    if(Data.msg.status !== 'ok') {

			log.error({"Frame":JSON.stringify(Data)},'status of upload_complete frame is not-ok');
	                return callback(0,ws,'Status of upload_complete frame is not ok\n<b>'+JSON.stringify(Data)+'<b>');

	    }
	    log.info('response of upload_complete frame is\n'+JSON.stringify(Data));
	    frame=JSON.stringify({"v":1,"seq":12,"type":"req","to":"content","from":"user:"+vc_id+".content:0","msg":{"command":"start-conversion","data":{"path":"/vctemp/"+encodedFilename,"name":fileName,"type":fileType,"size":247288,"url":access_url,"user_id":"test@wiziq.com","vc_id":vc_id,"u_name":"a","tags":"content, "+fileExtension}}});
	    log.info('start-conversion frame is sent\n'+frame);
	    ws.send(frame);
	}
	if(l==3) {

	    log.info('response of start conversion frame is\n'+JSON.stringify(Data));
	    if(Data.msg.status !=='ok')
{
		    log.error({"Frame":JSON.stringify(Data)},'status of start conversion frame is not-ok');
	            return callback(0,ws,'Status of start conversion frame is not ok\n<b>'+JSON.stringify(Data)+'<b>');

	    }
	    else {
		    ws.send(JSON.stringify({"v":1,"seq":16,"type":"req","to":"content","from":"user:"+vc_id+".content:0","msg":{"command":"get-content","data":{"user_id":"test@wiziq.com"}}}));
		    log.info('get-content frame is sent');
	    }
	}
	if(l==4) {

		if(Data.msg.status !=='ok')
			{
		    	log.error({"Frame":JSON.stringify(Data)},'status of start conversion frame is not-ok');
	            	return callback(0,ws,'Status of start conversion frame is not ok\n<b>'+JSON.stringify(Data)+'<b>');
	    		}


		    log.info('No of files in content library is\n'+Data.msg.data.data.length);
		    log.info('\nContent Library File Listing');
		    var data=[];
		    for(i=0;i<Data.msg.data.data.length;i++){

				data[i]=Data.msg.data.data[i].name;
				log.info(data[i]);
		        }
		    if(data.indexOf(fileName)>-1) {
			log.info('File exists in the content library list');
		    }
		    else {
			log.info("File doesn't exist in content library");
		    }
		    return callback(1, ws, null);
		}
		l++;
	    }       // end of content block
	} // end of else part of frame category (info frames)

	}); //    end of  ws.on(message method
} // end of module.exports method
