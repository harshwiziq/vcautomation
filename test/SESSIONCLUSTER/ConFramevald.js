

// verify all frames should receive at user end for n user requests
// verify and validate full ack frame
// verify and validate full sessioninfo frame
// verify and validate full av-tokbox-v2 frame
// verify and validate full chat-box frame
var $=require('jquery-deferred');

var log=require('../../ext/Logger');
var useraccounts=require('../../ext/useraccounts');
var wst=require('../../app/SC/WebSocketCon');
var AllFrameReception=require('../../app/SC/AllFrameReception');
var AckFrameVald=require('../../app/SC/AckFrameVald');
var SessInfoFrameVald=require('../../app/SC/SessInfoFrameVald');
var AvTokboxFrameVald=require('../../app/SC/AvTokboxFrameVald');
var ChatBoxFrameVald=require('../../app/SC/ChatBoxFrameVald');
var PingPong=require('../../app/SC/PingPong');
var config=require('../../config/config')

var n=config.n;


describe('Session Cluster Test Suite [Resource allocation frame Validations]', function() {


	var ws_cons=[];
	var l=-1; //for counting web socket connections, so that we can close the ws connections after the completion of test cases 
	var data={};

	before(function(done) {
		data=useraccounts.data;
		done();
	});

	it('verify all frames are recieved or not', function(done) {

		this.timeout(90000);
		log.info({"TC":'verify all frames are recieved or not\n'},'Test Case')	;
		var k=0; // for counting the no of responses
		function appcall(id, displayName) {
			
			var dfd=$.Deferred();
			AllFrameReception(id, displayName, function(a,ws,errmsg) {
							
					if(ws)
						ws_cons[++l]=ws;
					if(a==1) {
					       k++; 
					}
					else {
						done('<b>'+errmsg+'<b>');  // <b> is printing in report in bold			
						
					}			
					if(k==n) {
						return dfd.resolve('Now k==n');
						
					}
					else
					{
						return dfd.reject('Not k==n ');
					}
			});
			return dfd.promise();		
		}
		
		for(var i=0;i<n;i++) {

		       appcall(data.items[i].id,data.items[i].displayName).then(function(status){console.log(status);done()},function(status){});
		//	promise.then(function(){done()},function(){done('error occurs')});
		}
	
		
		

	})

	it('Verify full ack frame structure for : v,from, to, type, status, vc_id and nickname should not be null', function(done) {

		this.timeout(90000);
		log.info({"TC":'Verify full ack frame structure for : v,from, to, type, status, vc_id and nickname should not be null'},'Test Case')	;
		var k=0; // for counting the no of responses
		function appcall(id, displayName) {
			
			var dfd=$.Deferred();
			AckFrameVald(id, displayName, function(a,ws,errmsg) {
					if(ws)
						ws_cons[++l]=ws;
					if(a==1) {
						k++; 
					}
					else {
						done('<b>'+errmsg+'<b>');  // <b> is printing in report in bold
					}
					if(k==n) {
						return dfd.resolve('now k==n');
					}				
					else {
						return dfd.reject('not k==n');
					}
			});
			return dfd.promise();
		}
		for(var i=0;i<n;i++) {
		       appcall(data.items[i].id,data.items[i].displayName).then(function(status){console.log(status);done()},function(status){});
		}

	})

	it('Verify full session info frame for : v, type, from, addressed to me etc', function(done) {

		this.timeout(90000);
		var k=0;
		log.info({"TC":'Verify full sesion info frame for : v, type, from, addressed to me etc'},'Test Case')	;
		function appcall(id, displayName) {

			var dfd=$.Deferred();
			SessInfoFrameVald(id, displayName, function(a,ws,errmsg) {
				if(ws)
					ws_cons[++l]=ws;
				if(a==1) {
					k++; 
				}
				else {
					done('<b>'+errmsg+'<b>');  // <b> is printing in report in bold
				}
				if(k==n) {
					return dfd.resolve('now k==n');
				}				
				else {
					return dfd.reject('not k==n');
				}			
			});
			return dfd.promise();
		}
		for(var i=0;i<n;i++) {
			
			appcall(data.items[i].id,data.items[i].displayName).then(function(status){console.log(status);done()},function(status){});
		}
	})

	it('verify full av-tokbox-v2 frame for : v, type, from, addressed to me, status, username (vc_id)', function(done) {

		this.timeout(90000);
		var k=0;
		log.info({"TC":'verify full av-tokbox-v2 frame for : v, type, from, addressed to me, status, username (vc_id)'},'Test Case')	;
		function appcall(id, displayName) {

			var dfd=$.Deferred();
			AvTokboxFrameVald(id, displayName, function(a,ws,errmsg) {
				if(ws)
					ws_cons[++l]=ws;
				if(a==1) {
					k++; 
				}
				else {
					done('<b>'+errmsg+'<b>');  // <b> is printing in report in bold
				}					
				if(k==n) {
					return dfd.resolve('now k==n');
				}				
				else {
					return dfd.reject('not k==n');
				}			
			});
			return dfd.promise();
		}
		for(var i=0;i<n;i++) {
			
			appcall(data.items[i].id,data.items[i].displayName).then(function(status){console.log(status);done()},function(status){});
		}

		

	})

	it('Verify full chat-box frame for : v, type, from, addressed to me, status, root_url, room_id, vc_id', function(done) {

		this.timeout(90000);
		var k=0;
		log.info({"TC":'Verify full chat-box frame for : v, type, from, addressed to me, status, root_url, room_id, vc_id'},'Test Case')	;
		function appcall(id, displayName) {

			var dfd=$.Deferred();
			ChatBoxFrameVald(id, displayName, function(a,ws,errmsg) {
				if(ws)
					ws_cons[++l]=ws;
				if(a==1) {
					k++; 
				}
				else {
					done('<b>'+errmsg+'<b>');  // <b> is printing in report in bold
				}				
				if(k==n) {
					return dfd.resolve('now k==n');
				}				
				else {
					return dfd.reject('not k==n');
				}			
			});
			return dfd.promise();
		}
		for(var i=0;i<n;i++) {
			
		       appcall(data.items[i].id,data.items[i].displayName).then(function(status){console.log(status);done()},function(status){});
		}


	})
	
	it('verify pong frame should be there in the response, by sending ping frame from client side',function(done) {

		this.timeout(180000);
		log.info({"TC":'verify pong frame should be there in the response, by sending ping frame from client side'},'Test Case')	;
		PingPong(function(a, ws, msg) {
			if(ws)
				ws_cons[++l]=ws;
			if(a==1) {
				done();
			}
			else {	
				done(msg);
			}

		})

	})
	
	afterEach(function(done) {

		this.timeout(60000);
		if(l==-1) {
			done();
		}
		for(var i=0;i<=l;i++) {
			try{
				ws_cons[i].close();
			}
			catch(e) {
				done('Exception occurs while closing web socket connections');
			}
			if(i==l) {
				l=-1;
				done();
			}
		}
	})

});;



