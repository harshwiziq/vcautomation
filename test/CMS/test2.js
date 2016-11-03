
var app4=require('../../app/CMS/app4');
var log=require('../../ext/Logger');
var app3=require('../../app/CMS/app3');
var $=require('jquery-deferred');

describe('Content Library Test Suite II', function() {

    var ws_cons=[];  // web socket connections
    var l=-1; // for counting the web socket connections

    it("Two users are in session, one user sends 'new-content' frame it should recieve at second user end", function(done) {

	this.timeout(300000);
	log.info({"TC":"Two users are in session , one user sends 'new-content' frame it should recieve at second user end"},'Test Case');
	var d=0;
		app3('a31','aaaa', 'test.pdf', 1, function(a,ws,msg) {

			if(ws)
				ws_cons[++l]=ws;//we are storing the web socket refrences in an array, will close these socket connections in after block
			if(a==1) {
				d=1;	
			} 
			else {
				done(msg);
			}
		})

		app4('b','bbb', 'test.pdf',function(a, ws, msg) {
	
			if(ws) 
				ws_cons[++l]=ws;
			if(a==1) {
				done();
			}
			else {
				done(msg);
			}
		})
    })  // end of it block

     it("Two users are in session, one user sends 'tab-now-showing' frame it should recieve at second user end", function(done) {

	this.timeout(300000);
	log.info({"TC":"Two users are in session , one user sends 'tab-now-showing' frame it should recieve at second user end"},'Test Case');
	var d=0;
		app3('a32','aaaa', 'test.pdf', 2, function(a,ws,msg) {

			if(ws)
				ws_cons[++l]=ws;//we are storing the web socket refrences in an array, will close these socket connections in after block
			if(a==1) {
				d=1;	
			} 
			else {
				done(msg);
			}
		})

		app4('b','bbb', 'test.pdf',function(a, ws, msg) {
	
			if(ws) 
				ws_cons[++l]=ws;
			if(a==1) {
				done();
			}
			else {
				done(msg);
			}
		})
    })  // end of it block

	it("Two users are in session, one user sends 'scroll-to' frame it should recieve at second user end", function(done) {


	this.timeout(300000);
	log.info({"TC":"Two users are in session , one user sends 'scroll-to' frame it should recieve at second user end"},'Test Case');
	var d=0;
		app3('a33','aaaa', 'test.pdf', 3, function(a,ws,msg) {

			if(ws)
				ws_cons[++l]=ws;//we are storing the web socket refrences in an array, will close these socket connections in after block
			if(a==1) {
				d=1;	
			} 
			else {
				done(msg);
			}
		})

		app4('b','bbb', 'test.pdf',function(a, ws, msg) {
	
			if(ws) 
				ws_cons[++l]=ws;
			if(a==1) {
				done();
			}
			else {
				done(msg);
			}
		})
    })  // end of it block

    it("Two users are in session, one user sends 'navigate-to' frame it should recieve at second user end", function(done) {


	this.timeout(300000);
	log.info({"TC":"Two users are in session , one user sends 'navigate-to' frame it should recieve at second user end"},'Test Case');
	var d=0;
		app3('a34','aaaa', 'test.pdf', 4, function(a,ws,msg) {

			if(ws)
				ws_cons[++l]=ws;//we are storing the web socket refrences in an array, will close these socket connections in after block
			if(a==1) {
				d=1;	
			} 
			else {
				done(msg);
			}
		})

		app4('b','bbb', 'test.pdf',function(a, ws, msg) {
	
			if(ws) 
				ws_cons[++l]=ws;
			if(a==1) {
				done();
			}
			else {
				done(msg);
			}
		})
    })  // end of it block

 it("Two users are in session, one user sends 'pointer-event/pointer-moved' frame it should recieve at second user end", function(done) {


	this.timeout(300000);
	log.info({"TC":"Two users are in session , one user sends 'pointer-event/pointer-moved' frame it should recieve at second user end"},'Test Case');
	var d=0;
		app3('a35','aaaa', 'test.pdf', 5, function(a,ws,msg) {

			if(ws)
				ws_cons[++l]=ws;//we are storing the web socket refrences in an array, will close these socket connections in after block
			if(a==1) {
				d=1;	
			} 
			else {
				done(msg);
			}
		})

		app4('b','bbb', 'test.pdf',function(a, ws, msg) {
	
			if(ws) 
				ws_cons[++l]=ws;
			if(a==1) {
				done();
			}
			else {
				done(msg);
			}
		})
    })  // end of it block

it("Two users are in session, one user sends 'pointer-event/pointer-enter' frame it should recieve at second user end", function(done) {


	this.timeout(300000);
	log.info({"TC":"Two users are in session , one user sends 'pointer-event/pointer-enter' frame it should recieve at second user end"},'Test Case');
	var d=0;
		app3('a36','aaaa', 'test.pdf', 6, function(a,ws,msg) {

			if(ws)
				ws_cons[++l]=ws;//we are storing the web socket refrences in an array, will close these socket connections in after block
			if(a==1) {
				d=1;	
			} 
			else {
				done(msg);
			}
		})

		app4('b','bbb', 'test.pdf',function(a, ws, msg) {
	
			if(ws) 
				ws_cons[++l]=ws;
			if(a==1) {
				done();
			}
			else {
				done(msg);
			}
		})
    })  // end of it block

it("Two users are in session, one user sends 'pointer-event/pointer-leave' frame it should recieve at second user end", function(done) {


	this.timeout(300000);
	log.info({"TC":"Two users are in session , one user sends 'pointer-event/pointer-leave' frame it should recieve at second user end"},'Test Case');
	var d=0;
		app3('a37','aaaa', 'test.pdf', 7, function(a,ws,msg) {

			if(ws)
				ws_cons[++l]=ws;//we are storing the web socket refrences in an array, will close these socket connections in after block
			if(a==1) {
				d=1;	
			} 
			else {
				done(msg);
			}
		})

		app4('b','bbb', 'test.pdf',function(a, ws, msg) {
	
			if(ws) 
				ws_cons[++l]=ws;
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
