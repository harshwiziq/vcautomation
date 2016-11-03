var useraccounts=require('../ext/useraccounts');
var config=require('../config/config')
var log=require('../ext/Logger');
var app1=require('../app/AL/AttendeesCount.js');

var n=process.env.n; // no of users
var to=process.env.to; // timeout, for how much time users remain in the session

describe('Test Suite', function() {



var ws_cons=[];
var l=-1; //for counting web socket connections, so that we can close the ws connections after the completion of test cases 
var data={};

        before(function(done) {
                data=useraccounts.data;
                done();
        });

it('Connect users to session', function(done) {

                this.timeout(3600000);
                log.info({"TC":'connect users to session'},'Test Case')    ;
                var k=0;
                function appcall(id, displayName) {

                        app1(id, displayName, function(a, len, vc_ids, ws, msg) {

                                        if(ws)
                                                ws_cons[++l]=ws;
                                        if(a==1) {
                                               k++;
                                        }
                                        else {
                                                done('<b>'+msg+'<b>');  // <b> is printing in report in bold
                                        }
                        });
                }
                for(var i=0;i<n;i++) {
			setTimeout(function(){},1000);
                        appcall(data.items[i].id,data.items[i].displayName);
                }

                setTimeout(function(){
                        done();
                },(to*1000));

        })




})
