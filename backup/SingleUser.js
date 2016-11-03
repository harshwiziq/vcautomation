// Test Case of Single User

// verify vc_id and nickname should be same for multiple calls of a same user

// user joins the session, user leaves the session, user rejoins the session, verify info comes in 2nd call should be same as 1st call

// same user joind two different sessions verify info should be different (vc_id, chat room_id and sessionid etc)

var VcIdnNickExt=require('../../app/SC/VcIdnNickExt.js');
var useraccounts=require('../../ext/useraccounts');
var RefreshCase=require('../../app/SC/RefreshCase.js');
var CommUserMulSess=require('../../app/SC/CommUserMulSess.js');
var config=require('../../config/config.js');
var log=require('../../ext/Logger');

var n=config.n; // It is the maximum no of users

describe('Session Cluster Test Suite [Single User Functionality]', function () {

	var ws_cons=[];
	var l=-1; //for counting the web socket connections 
	var data={};
	var j=0;
	var vc_ids=[];
	var nicknames=[];
	before(function(done) {

		this.timeout(60000);
		data=useraccounts.data;
		done();

	});

	it('verify vc_id should be same for every call to the same user', function(done){


		this.timeout(120000);
		log.info({"TC":'verify vc_id should be same for every call to the same user'},'Test Case');
		function appcall(id, displayName) {
		
			VcIdnNickExt(data.items[j].id,data.items[j].displayName,function(a, vc_id, nickname, ws, msg) {
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
                log.info({"vc_ids":vc_ids},"VC IDS ARE");
                log.info({"unique_ids_are":unique_ids},"UNIQUE VC IDS ARE");
		if(vc_ids.length !==n) {
			done ('responses are not coming within given timeout period');
		}
		else {
			if(unique_ids.length ==1) {
				done();
			}
			else {
				done("vc_id is not same for every call to the same user");
			}
		}
	
		}, 60000);

	});// Test Case End
		
	it("verify nickname should be same for every call to the same user",function(done) {

		this.timeout(120000);
		log.info({"TC":'verify nickname should be same for every call to the same user'},'Test Case');
		function onlyUnique(value, index, self) {
			return self.indexOf(value) === index;
		}
		var unique_nicknames=nicknames.filter( onlyUnique );
		log.info({"nicknames":nicknames},"Nick Names Are");
		log.info({"unique_nicknames":unique_nicknames},"UNIQUE Nick Names Are");
		if(unique_nicknames.length ==1) {
			done();
		}
		else {
			done("nick name is not same for every call to the same user");
		}
	});  // Test Case End

	it('Refresh Case- user joins the session, user leaves the session, user rejoins the session, verify info comes in 2nd call should be same as 1st call', function(done) {

		var Data={};
		this.timeout(60000);
		log.info({"TC":'Refresh Case- user joins the session, user leaves the session, user rejoins the session, verify info comes in 2nd call should be same as 1st call'},'Test Case');
		RefreshCase('a','aa',function(a, DATA, ws, msg) {
			if(ws)
				ws_cons[++l]=ws;
			if(a==1) {
				Data=DATA;
				//Data.x='a';    // remove the comments for failing this test case manually
			}
			else {
				done(msg);
			}
		})

		setTimeout(function(){

			RefreshCase('a','aa',function(a, DATA2, ws, msg) {
				if(ws)
					ws_cons[++l]=ws;
				if(a==1) {
					if(JSON.stringify(Data) === JSON.stringify(DATA2)) {
						done();
					}
					else {
						done('Info is not matching');
					}
				}
				else {
					done(msg);
				}	
			})

		}, 30000);

	})
	
	it('same user joind two different sessions verify info should be different (vc_id, chat room_id, sessionid)', function(done) {

			
		this.timeout(60000);
		log.info({"TC":'same user joind two different sessions verify info should be different (vc_id, chat room_id, sessionid)'},'Test Case');
		var Data={};
		CommUserMulSess('a','aa',0,function(a, DATA, ws, msg) {      // 0 for 1st session
			if(ws)
				ws_cons[++l]=ws;
			if(a==1) {
				Data=DATA;
				//Data.x='a';    // remove the comments for failing this test case manually
			
			}
			else {
				done(msg);
			}
		})
		setTimeout(function(){

			CommUserMulSess('a','aa',1,function(a, DATA2, ws, msg) {    // 1 for 2nd session
						if(ws)
							ws_cons[++l]=ws;
						if(a==1) {
							if(JSON.stringify(Data) !== JSON.stringify(DATA2)) {
								done();
							}
							else {
								done('Info is matching, it should be different');
							}
						}
						else {
							done(msg);
						}
			})
		}, 30000);
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

});; // Test Suite End


