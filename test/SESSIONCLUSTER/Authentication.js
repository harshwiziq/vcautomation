
var Authentication=require('../../app/SC/Authentication.js');
var log=require('../../ext/Logger');
var config=require('../../config/config');

describe('Session Cluster Test Suite [Authentication]',function() {



	var data;
	var ws_cons=[];  // web socket connections
	var l=-1; // for counting the web socket connections

	it('verify anonymous user authentication by id and displayName only',function(done) {

		this.timeout(60000);
		log.info({"TC":'verify anonymous user authentication by id and displayName only'},'Test Case');

		data={"v":1,"seq":0,"type":"req","to":"controller.auth","from":"user:-not-yet-authenticated-","msg":{"command":"authenticate-me","data":"%7B%22id%22%3A%22abc%22%2C%22displayName%22%3A%22abc%22%7D"}};

		Authentication(JSON.stringify(config.eid),function(a,ws,errmsg) {

			if(ws)
				ws_cons[++l]=ws;    // we are storing the web socket refrences in an array so that we can close these web sockets after the test suite completed
			if(a==1) {
				done();		
			}
			else {
				done(errmsg);
			}


		})


	})

	it('verify google user authentication by sending google account information',function(done) {

		this.timeout(60000);
		log.info({"TC":'verify google user authentication by sending google account information'},'Test Case');
		
data={
  "v": 1,
  "seq": 0,
  "type": "req",
  "to": "controller.auth",
  "from": "user:-not-yet-authenticated-",
  "msg": {
    "command": "authenticate-me",
    "data": {
      "e_identity": "2b5703e965e9b30a24662618b1518ba1b6b95ad13a5d796515b59aa746a528cca4fd50e92e6bc9cafddb6d3457854a52ba0db9abb7f3bcd8dc39db8f546eda7a2c4ad78a95fdb49db121d714d9e1e00770f59c0a8f2eb1d96643bfd1480ea36cdc731c3aa3fbeb07455f7e6c5442a5aa6755db17529cb418e852de9219f2edb17f1355edf045d25108f61e78ad1751555c539fbc9f8c688506b7c9ae4eeac952315d05c3e6826bfc1193aeb730c07678e31cca4e061aec778f192b0859e6c6a047d66cd6994d1cd9cda5bc7c22c91d5c5f34ade9e2b2deb8f9f22c853f240cf3a5f17dbd1a7d4780915822b20908d92d6d3fed5ee7a47fd9ac14d492ac3e653690d7de8f5fe81eda1675c6d5a93cc6e8a9f178502005e61bb59eec34ebe5a315f037faac2435e7820c633d91cffd8b93a6cfb557c037a0c5b67a17d395822d0bc8c62de0645057dfd3252a0577758c9d33dcfed50966985af7138bd6dd0362620719035cdf901f8d81b1d815b60c266d4285f5cbde5091e4e741d5dd46fc37b6ef80e5452d38eeeca057d789ee648aede436c6fe08c4bd2e5e5fabb22e300c5d10d3125996ce154a1256575f5cbbd82c992f91c6a5ded6f809ed20ba530a4b623445bcd49d16a435953c53b4acd57b51b94ae8003ac5a2878131dc009c80c0e00d656f42dd496ea2e909d74f1338a52516c9c32c157c42fa3c563ff0c8e08a742f720e8355ad83751534cb88c906a38cf1f8d5cef8d36791a7d23744f6b04626437042fccb7b355b962bcd0def4af6c803cacac083a6dda10ea1688fea74b6431fefe97ae19cab8b2c84b41913e63ffd52b00a2af8966266c51d5845391e531ac77f31887be62b9c3317de5869566804567c8482a435aa5f90758a4cd1403f7c805363d3f5e21cc2d6c60e66f9703493a5e0e40db54e93d5f11b111b849915aa06041b14fd488b58c2a4288d6a277245a445442e766e39df4f40ad747c423fd5c43a66fc282a84920b7ccc42405e658dd1a025c252b30b47a7ba5747e59bb1e6dbd897e4140ee1f0c4ee5f24bb02a4010a3fc803d0d686a79f1410d725604ac2b4c9392cc303882d323936ca8f10098bf5d774ba8fabcb1630e7aa863a9fed3f59eecde3c5b315488747178f05fd57b6100c72669915def005e012dfbcfb777e",
      "e_role": null
    }
  }
};

		 Authentication(JSON.stringify(data),function(a,ws,errmsg) {

				if(ws)
					ws_cons[++l]=ws;
				if(a==1) {
					done();  
				}
				else {
					done(errmsg);
				}


			})

	})

	

	afterEach(function(done) {     // close the web socket connections here after test suite
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

});;;
