var app=require('../app/CMS/app1');
var app2=require('../app/CMS/app2');
var log=require('../../ext/Logger');
var filename=process.env.n;

describe('Content Library Test Suite I', function() {

    var ws_cons=[];  // web socket connections
    var l=-1; // for counting the web socket connections

    it('verify for a pdf file, get a tmp url for a file, upload it on amazon s3, start conversion, conversion should be successful', function(done) {

	this.timeout(300000);
	log.info({"TC":'verify for a pdf file, get a tmp url for a file, upload it on amazon s3, start conversion, conversion should be successful'},'Test Case')
	app('a1','aaaa', filename, function(a,ws,msg) {

		if(ws)
			ws_cons[++l]=ws;//we are storing the web socket refrences in an array, will close these socket connections in after block
		if(a==1) {
			done();
		} 
		else {
			done(msg);
		}
	})
    })  // end of it block

    

  
    afterEach(function(done) {     // close the web socket connections here after test suite

	this.timeout(60000);
	if(l==-1) {    // there is no web socket connection
	    done();
	}
	for(var i=0;i<=l;i++) {
	    try{
		ws_cons[i].close();
	    }
	    catch(e) {
		done('Exception occurs while closing web socket connection');
	    }
	    if(i==l) {
		l=-1;
		setTimeout(function(){ done();}, 3000);
	    }
	}
    }) 


})
