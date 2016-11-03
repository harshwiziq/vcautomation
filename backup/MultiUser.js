// Test Cases of Multi User

// send n no of user requests, 

// verify vc_id assigned to each user should be unique for every user

// verify nicknames assigned to each user should be unique for every user

// verify chat room id should be same for every user in a particular session

// verify session id should be same for every user in a particular session, in av-tokbox frame

// verify all attendees info should come in session-info frame



var VcIdnNickExt=require('../../app/SC/VcIdnNickExt.js');
var useraccounts=require('../../ext/useraccounts');
var ChatRoomIdExt=require('../../app/SC/ChatRoomIdExt.js');
var SessIdExtAv=require('../../app/SC/SessIdExtAv.js');
var AttArrayExt=require('../../app/SC/AttArrayExt.js');
var CoAttendeeVer=require('../../app/SC/CoAttendeeVer.js');
var config=require('../../config/config.js');
var log=require('../../ext/Logger');

var n=config.n;
// dont delete the n because in the last test case m is calculated from n

describe('Session Cluster Test Suite [Multi User Functioanlity]',function() {



var ws_cons=[];

	 var data={};
	 var j=-1;
	 var l=-1; // for counting the web socket connections
	 var vc_ids=[];
	 var nicknames=[];
	 var chat_room_ids=[];
	 var session_ids=[];

		
       	before(function(done) {

	    this.timeout(60000);
	    data=useraccounts.data;
	    done();
         });

	it('verify vc_id should be unique for every user',function(done){

		this.timeout(120000);
		log.info({"TC":'verify vc_ids should be unique for every user\n'},'Test Case');

		function appcall(id, displayName) {

			VcIdnNickExt(id, displayName, function(a, vc_id, nickname, ws, msg) {
				if(ws)
					ws_cons[++l]=ws;
				if(a==1) {
					vc_ids.push(vc_id);
					nicknames.push(nickname);
				}
				else {
					done(msg);
				}
			});
		}// end of function appcall

		for(var i=0;i<n;i++) {
			appcall(data.items[i].id, data.items[i].displayName);
		}

		setTimeout(function() {	
			function onlyUnique(value, index, self) {
				return self.indexOf(value) === index;
			}
			var unique_ids=vc_ids.filter( onlyUnique );
			log.info({"vc_ids": vc_ids}, "VC IDS ARE");
			log.info({"unique_ids":unique_ids}, "UNIQUE VC IDS ARE");
			if(vc_ids.length !==n) {
				done("responses are not coming within given timeout period increase timeout period");
			}
			else {
				if((vc_ids.toString()) === (unique_ids.toString())) {
					done();
				}
				else {
						done("vc_id's are not unique for different users");
				}
			}
		}, 90000);
	}); // end of test case
		
	it('verify nick names should be unique for every user',function(done) {

		this.timeout(120000);
		log.info({"TC":'verify nick names should be unique for every user\n'},'Test Case');
		function onlyUnique(value, index, self) {
			return self.indexOf(value) === index;
		}
		var unique_nicknames=nicknames.filter( onlyUnique );
		log.info({"nickname":nicknames},"Nick Names Are");
		log.info({"unique_nicknames":unique_nicknames},"UNIQUE Nick Names Are");
		if(nicknames.length !==n) {
			done('responses are not coming withing given timeout period increase timeout period');
		}
		else {
			if((nicknames.toString()) === (unique_nicknames.toString())) {
				done();
			}
			else {
				done("nick names are not unique for different users");
			}
		}
	});  // end of Test Case

	it('verify chat room id should be same for every user in a particular session', function(done) {

		this.timeout(120000);
		log.info({"TC":'verify chat room id should be same for every user in a particular session'},'Test Case');
		function appcall(id, displayName) {

			ChatRoomIdExt(id, displayName,function(a, room_id, ws, msg) {
				if(ws)
					ws_cons[++l]=ws;
				if(a==1) {
					chat_room_ids.push(room_id);
					log.info({"room_id":room_id},"room id");
				}
				else {
					done(msg);
				}
			});
		}// end of function appcall

		for(var i=0;i<n;i++) {
			appcall(data.items[i].id, data.items[i].displayName);
		}

		setTimeout(function(){

			function onlyUnique(value, index, self) {
				return self.indexOf(value) === index;
			}
			var unique_room_ids=chat_room_ids.filter( onlyUnique );
			log.info({"Chat room Ids are":chat_room_ids},"Chat room IDS received ARE");
			log.info({"unique_room_ids":unique_room_ids},"UNIQUE Chat room IDS ARE");
			if(chat_room_ids.length !== n) {
				done('responses are not coming within given timeout period');
			}
			else {
				if(unique_room_ids.length == 1) {
					done();
				}
				else {
					done("chat room id is not unique for every user in the same session");
				}
			}
		}, 90000);

	}) // end of test case	

	it('verify session id should be same for every user in a particular session, in av-tokbox frame', function(done) {

		this.timeout(1200000);
		
		log.info({"TC":'verify session id should be same for every user in a particular session, in av-tokbox frame'},'Test Case');
		function appcall(id, displayName) {

			SessIdExtAv(id, displayName,function(a, session_id, ws, msg) {
				if(ws) 
					ws_cons[++l]=ws;
				if(a==1) {
					session_ids.push(session_id);
					log.info({"session_id":session_id},"session id is ");
				}
				else {
					done(msg);
				}
			});
		}// end of function appcall
		
		for(var i=0;i<n;i++) {
			appcall(data.items[i].id, data.items[i].displayName);
		}

		setTimeout(function() {

			function onlyUnique(value, index, self) {
				return self.indexOf(value) === index;
			}
			var unique_session_ids=session_ids.filter( onlyUnique );
			log.info({"session ids are": session_ids},"Session IDS received ARE");
			log.info({"unique session ids are":unique_session_ids},"UNIQUE Session IDS ARE");
			if(session_ids.length !==n) {
				done('responses are not within the given timeout increase time');
			}
			else {
				if(unique_session_ids.length == 1) {
				done();
				}
				else {
				done("session id is not unique for every user in the same session");
				}
			}
			}, 90000);

	})// end of test case	

	it('Multiple users are in session, One new user joins the session. verify all attendees info should come in session-info frame & vc_ ids should be unique in that array', function(done) {

		var m=n-1;
		var i;
		var vc_ids=[];

		this.timeout(1200000);
		log.info({"TC":'Multiple users are in session, One new user joins the session. verify all attendees info should come in session-info frame & vc_ ids should be unique in that array'},'Test Case');
		function appcall(id, displayName) {

			AttArrayExt.registerusers(id, displayName, function(a, vc_id, ws, msg) {
				if(ws)
					ws_cons[++l]=ws;
				if(a==1) {
					vc_ids.push(vc_id);
				}
				else {
					done(msg);
				}
			});
		}// end of function appcall

		for(i=0;i<m;i++) {
			appcall(data.items[i].id, data.items[i].displayName);
		}

		setTimeout(function() {

			AttArrayExt.getsessioninfo(data.items[i].id,data.items[i].displayName,function(a, len, si_frame_vc_ids, ws, msg) {

				if(ws)
					ws_cons[++l]=ws;
				if(a==1) {

					log.info({'len':len},'Length of attendees array in session info frame is');
					if(i==len) {

						function onlyUnique(value, index, self) {
							return self.indexOf(value) === index;
						}

						var unique_ids=si_frame_vc_ids.filter( onlyUnique );
						log.info({"si_frame_vc_ids":si_frame_vc_ids},"Session Info Frame vc IDS ARE");
						log.info({"Unique vc ids are": unique_ids},"UNIQUE VC IDS ARE");
						if((si_frame_vc_ids.toString()) === (unique_ids.toString())) {
							done();
						}
						else {
							done('vc ids in the session info frame are not coming unique');
						}

					}
					else {
						done('error occurs '+i+' users sent but '+len+' users coming in session info frame');
					}
				}
				else {
					log.error('error occurs');
					done(msg);
				}
			})
		}, 90000);

	}) // end of test case

	it('User1 joins the session. Now user2 joins the session. Verify user1 should get user2 info as new-johny frame', function(done) {

		this.timeout(120000);
		log.info({"TC":'User1 joins the session. Now user2 joins the session. Verify user1 should get user2 info as new-johny frame'},'Test Case');
		var seconduser_vc_id=null;
		CoAttendeeVer.firstuser('a','aa',function(a, vc_id, ws, msg) {

			if(ws)
				ws_cons[++l]=ws;
			if(a==1) {
				setTimeout(function(){
					if(seconduser_vc_id===vc_id) {
						done();
					}
					else {
						done('vc_id is not correct in new johny frame');
					}
				},40000);
			}
			else {
				done(msg);		
			}
		})

		setTimeout(function() {

			CoAttendeeVer.seconduser('b','bb',function(a, vc_id, ws, msg) {
				if(ws)
					ws_cons[++l]=ws;
				if(a==1) {
					seconduser_vc_id=vc_id;
				}
				else {
					done(msg);		
				}
			})
		},10000);	

	})

	afterEach(function(done) {

		this.timeout(60000);
		if(l==-1) {
			done();
		}
		for(var i=0;i<=l;i++) {
			try {
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
	})  // end of afterEach

});;






