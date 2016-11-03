var $=require('jquery-deferred');

var app1=require('../../app/AL/AttendeesCount.js');
var app2= require('../../app/AL/NewJohny.js');
var app3=require('../../app/AL/JohnyGone.js');
var useraccounts=require('../../ext/useraccounts');
var log=require('../../ext/Logger');

describe('Attendee List Test Suite', function() {


var data={};
var ws_cons=[];  // web socket connections for this suite
var l=-1; // for counting the web socket connections for thi suite

					// get data from mongo db
        before(function(done) {
                this.timeout(120000);
                data=useraccounts.data;
		done();

        });


describe('Visibility of users in Attendee List [Join/ Rejoin/ Refresh/ Leave]', function(){


describe('Single User Test Cases', function(){



it('First user joins the session, verify attendees array in session-info frame should be empty', function(done) {

	log.info({"TC":'First user joins the session, verify attendees array in session-info frame should be empty'},'Test Case');
	this.timeout(60000);
	app1('a','b',function(a, len, vc_ids, ws, msg) {

		if(ws)
		       ws_cons[++l]=ws;//we are storing the web socket refrences in an array, will close these socket connections in after block

		if(a==1) {
			if(len==0) //verify the attendee array lenght is 0.
				done();
			else
				done('First user joins the session but attendees array is not empty');
		}
		else {
			done(msg);
		}

	})
}) // Test Case End


it('First user joins the session, leaves and rejoins the session, verify attendess array in session-info frame should be empty', function(done) {

	log.info({"TC":'First user joins the session, leaves and rejoins the session, verify attendess array in session-info frame should be empty'},'Test Case');
	this.timeout(60000);
        app1('a','b', function(a, len, vc_ids, ws, msg) {

                if(ws)
                       ws_cons[++l]=ws;//we are storing the web socket refrences in an array, will close these socket connections in after block

                if(a==1) {
			 ws_cons[l].close();   // user came and then went away by closing websocket.
			 l=l-1; //decrement 1 websocket

      //open new websocket.
       app1('a','b', function(a, len, vc_ids, ws, msg) {

				if(ws)
				     ws_cons[++l]=ws;
				if(a==1) {
          //verify attendee length is 0.
					if(len==0) {
					 	done();
					}
					else {
						done('attendees array length is not zero');
					}
				}
				else {
					done(msg);
				}
			 })
                }
                else {
                        done(msg);
                }

        })
})  // Test Case End


afterEach( function(done) {     // close the web socket connections here after test suite

        this.timeout(60000);
        if(l==-1) {    // there is no web socket connections
                done();
        }
        for(var i=0;i<=l;i++) {
                try {
                 ws_cons[i].close();
                }
                catch(e) {
                  log.eror('Exception occurs while closing web socket connections in afterEach method');
                }
        	if(i==l) {
	    		l=-1;
            		done();
	 	}
        }
})

}) // Single User Test Suite End

describe('Multi User Test Cases', function(){



it('First user joins the session then second user. In the session-info frame of second user, attendees array length should be 1', function(done)
{

	this.timeout(60000);
	log.info({'TC':'First user joins the session then second user. In the session-info frame of second user, attendees array length should be 1'},'Test Case');

  //first attendee joins
	app1('a','b', function(a, len, vc_ids, ws, msg) {

		if(ws)
			ws_cons[++l]=ws; //we are storing the web socket refrences in an array, will close these socket connections in after block
		if(a==1) {
      //second attendee joins.
    	   app1('c','d', function(a, len, vc_ids, ws, msg) {

    				if(ws)
    					ws_cons[++l]=ws;

    				if(a==1) {
    					if(len==1)
    					    done();
    					else
    					    done('attendees array length is not coming 1');
    				}
    				else {
    					done(msg);
    				}
			   })
		}
		else {
			done(msg);
		}
})


}); // Test Case End

it('First user joins the session then second user. First user should get the new-johny frame', function(done) {

	this.timeout(60000);
	log.info({'TC':'First user joins the session then second user. First user should get the new-johny frame'},'Test Case');

  //verify first user get the new-johny frame.
	app2('a','b', function(a, ws, msg) {

		     if(ws)
			ws_cons[++l]=ws;

		     if(a==1) {
			done();
		      }
		     else {
			done(msg);
		      }
	})

//wait for second user to join.
	setTimeout(function(){
		app1('c','d', function(a, len, vc_ids, ws, msg) {
				 if(ws)
					ws_cons[++l]=ws;
		});
	}, 10000);
	    // 10 sec gap between first and second user generation. For this test case, first user should be connected before the 2nd user


}); // Test Case End

it("First user joins the session then second user. First user leaves the session. Second user should get the frame 'johny-go-went-gone'", function(done) {

	this.timeout(90000);
	log.info({'TC':"First user joins the session then second user. First user leaves the session. Second user should get the frame 'johny-go-went-gone'"},'Test Case');
	var wss;
  //First user joins session.
	app1('a','b', function(a, len, vc_ids, ws, msg) {
		if(ws) {
			wss=ws;
		}
		if(a==0) {
			done(msg);
		}
	})

  //wait for second user to join session and receive the johny-go-went-gone frame.
	setTimeout(function(){

		app3('c','d', function(a, ws, msg) {

			if(ws)
				ws_cons[++l]=ws;
			if(a==1) {
				done();
			}
			else {
				done(msg);
			}

		});

	}, 3000);

//first user leavs session.
	setTimeout(function(){

		wss.close();
	},15000);

}); // Test Case End

it("First user joins the session then second user. Second user leaves the session. First user should get the frame 'johny-go-went-gone'", function(done) {

	this.timeout(90000);
	log.info({'TC':"First user joins the session then second user. Second user leaves the session. First user should get the frame 'johny-go-went-gone'"},'Test Case');
	var wss;

  //first user joins
	app3('a','b', function(a, ws, msg) {
		if(ws) {
		     ws_cons[++l]=ws;
		}
		if(a==1) {
			done();
		}
		else {
			done(msg);
		}
	 })
//second users joins
	 setTimeout(function(){

	   app1('c','d', function(a, len, vc_ids, ws, msg) {

		   if(ws) {
			wss=ws;
		   }
		   if(a==0) {
			done(msg);
		   }

	    });

	 }, 6000);

//second user leavs.
	 setTimeout(function(){

		wss.close();
	 }, 15000);



});  // Test Case End


it('First user joins the session, leaves and rejoins the session. Now second user joins the session. verify length of attendess array in session-info frame should be 1 ', function(done) {

	this.timeout(60000);
	var wss;
	log.info({'TC':"First user joins the session, leaves and rejoins the session. Now second user joins the session. verify length of attendess array in session-info frame should be 1"},'Test Case');

  //first user joins
	app1('a','b', function(a, len, vc_ids, ws, msg) {

		if(ws) {
			wss=ws;//we are storing the web socket refrences in an array, will close these socket connections in after block
		}

		if(a==1) {
      //first user leaves
      wss.close();
      //first user re-joins
			app1('a','b', function(a, len, vc_ids, ws, msg) {

				if(ws) {
					ws_cons[++l]=ws;
				}
				if(a==0) {
					done(msg);
				}
			})
		}
		else {
			done(msg);
		}

	})
//second user joins the session
	setTimeout(function() {

		app1('c','d', function(a, len, vc_ids, ws, msg) {

			if(ws) {
				ws_cons[++l]=ws;
			}
			if(a==1) {
				if(len==1) //verify second user joined.
					done();
				else {
					done('Array length is not equal to 1. it is coming'+len);
				}
			}
			else {
				done(msg);
			}

		})
	}, 20000);  // wait for 20 seconds


}) // Test Case End


it('Two users already in the session. Now third user joins the session. verify length of attendess array in session-info frame should be 2', function(done) {

	this.timeout(60000);
	log.info({'TC':"Two users already in the session. Now third user joins the session. verify length of attendess array in session-info frame should be 2"},'Test Case');
//first user joins session
	app1('a','b', function(a, len, vc_ids, ws, msg) {

		if(ws) {
			ws_cons[++l]=ws;//we are storing the web socket refrences in an array, will close these socket connections in after block
		}

		if(a==1) {
//second user joins session
			app1('c','d', function(a, len, vc_ids, ws, msg) {

				if(ws) {
					ws_cons[++l]=ws;
				}
				if(a==0) {
					done(msg);
				}
			})
		}
		else {
			done(msg);
		}

	})
//third user join session.
	setTimeout(function() {

		app1('e','f', function(a, len, vc_ids, ws, msg) {

			if(ws) {
				ws_cons[++l]=ws;
			}
			if(a==1) {
				if(len==2) //verify already loged in users are shown in session.
					done();
				else
					done('Array length is not equal to 2');
			}
			else {
				done(msg);
			}

		})
	}, 12000); // wait for 12 seconds


}) // Test Case End

it("Two users already in the session. Now third user joins the session. Verify first and second users should get the frames 'new-johny'", function(done) {

	this.timeout(90000);
	log.info({'TC':"Two users already in the session. Now third user joins the session. Verify first and second users should get the frames 'new-johny'"},'Test Case');
	var d=0;

//first user joins session
	app2('a','b', function(a, ws, msg) {

		if(ws) {
			ws_cons[++l]=ws;//we are storing the web socket refrences in an array, will close these socket connections in after block
		}

		if(a==1) {
			d++;
		}
		else {
			done(msg);
		}

	})

//second user joins session
	setTimeout(function() {

		app2('c','d', function(a, ws, msg) {

			if(ws) {
				ws_cons[++l]=ws;
			}
			if(a==1) {

				setTimeout(function(){
					if(d==2) {
						done();
					}
					else {
						done('new-johny frame is not recieved to all users');
					}
				},4000);
			}
			else {
				done(msg);
			}
		})
	}, 4000);

//third user joins session
	setTimeout(function() {

		app1('e', 'f', function(a, len, vc_ids,  ws, msg) {

			if(ws) {
				ws_cons[++l]=ws;
			}
			if(a==1) {

			}
			else {
				done(msg);
			}
	})

	},10000);


}) // Test Case End


it("Three users already in the session. Now third user leaves the session. verify first and second users should get the frames 'johny-go-went-gone'", function(done) {

	this.timeout(90000);
	log.info({'TC':"Three users already in the session. Now third user leaves the session. verify first and second users should get the frames 'johny-go-went-gone'"},'Test Case');
	var d;
//first user joins session
	app3('a','b', function(a, ws, msg) {

		if(ws) {

			ws_cons[++l]=ws;//we are storing the web socket refrences in an array, will close these socket connections in after block
		}

		if(a==1) {
			d=1;
		}
		else {
			done(msg);
		}

	})
//second user joins session
	setTimeout(function() {

		app3('c','d', function(a, ws, msg) {

			if(ws) {

				ws_cons[++l]=ws;
			}
			if(a==1) {
//verify first and second user should get johny-go-went-gone frame.
				setTimeout(function(){

					if(d==1) {

						done();
					}
					else {

						done('johny-go-went-gone is not recieved to all users');
					}
				},6000);
			}
			else {
				done(msg);
			}

		})
	}, 4000);

//Third user joins the session
	setTimeout(function() {

		app1('e', 'f', function(a, len, vc_ids,  ws, msg) {

			if(ws) {

				ws_cons[++l]=ws;
			}
			if(a==1) {
//Third user leavs session. Then above 2 users get the johny-go-went-gone frame.
				ws.close();
			}
			else {
				done(msg);
			}
		})

	},10000);

})  // Test Case End

it('Ninteen users already joins the session then 20th user. Verify length of attendees array in session-info frame should be 19', function(done) {

	this.timeout(120000);
	log.info({'TC':"Ninteen users already joins the session then 20th user. Verify length of attendees array in session-info frame should be 19"},'Test Case');

  var k=0;
	function appcall(id, displayName) {
		var dfd=$.Deferred();
		app1(id, displayName, function(a, len, vc_ids, ws, msg) {
			if(ws)
				ws_cons[++l]=ws;
			if(a==1){
				k++; //user added in sesson so increase counter.
			}
			else {
				done(msg);
			}
			if(k==19) {
				return dfd.resolve('now k=19');
			}
		})
		return dfd.promise();
	}

	for(var i=0;i< 19;i++) {
		appcall(data.items[i].id,data.items[i].displayName).then(function(){
//20th user added
			app1(data.items[i].id,data.items[i].displayName, function(a, len, vc_ids, ws, msg) {

				if(ws)
					ws_cons[++l]=ws;
				if(a==1) {
//20th user should get teh legth as 19.
					if(len==19)
						done();
					else
						done('length is not equal to 19. it is coming : '+len);
				}
				else {
					done(msg);
				}
			})
		});
	}


}) // Test Case End


afterEach( function(done) {     // close the web socket connections here after test suite

        this.timeout(60000);
        if(l==-1) {    // there is no web socket connections
                done();
        }
        for(var i=0;i<=l;i++) {
                try {
                 ws_cons[i].close();
                }
                catch(e) {
                  	log.error('Exception occurs while closing web socket connectionis');
                }
        	if(i==l) {
	    		l=-1;
            		done();
	 	}
        }
})

}) // Multi User Test Suite End

})// Visibility in Attendee List of users [Join/ Rejoin/ Refresh/ Leave]

})// Attendee List Part I Test Suite End
