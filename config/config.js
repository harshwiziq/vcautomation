//var hostName='wss://bhagirathi.cloudapp.net';
var hostName='wss://node-vcqa.wiziq.com';



var sessionName2='test1112-161026.120413.868'
//test1112

var sessionName1='test1111-161026.115518.756';
// test1111

//var chatRootUrl='https://wiziq-ubuntu-b.cloudapp.net/';

var chatRootUrl='https://prov-vcqa.wiziq.com/'

var setNoOfUsers=20;

var sessionurl=hostName+'/session/'+sessionName1;
var sessionurl2=hostName+'/session/'+sessionName2;

exports.sessionurl=sessionurl;
exports.sessionurl2=sessionurl2;

exports.hostname=hostName;
exports.chatRootUrl=chatRootUrl;
exports.n=setNoOfUsers;


// class links are


//https://backend-vcqa.wiziq.com:443/landing/session/v1/test101
// https://backend-vcqa.wiziq.com:443/landing/session/v1/test102
// These are forever classes with -1 duration


                var m = {};
                m.v     = 1;
                m.type  = 'req';
                m.to    = 'controller.auth';
                m.from  = 'user:-not-yet-authenticated-';
                m.msg  = {
                        command : 'authenticate-me',
                        data    : 'test'
                };
                m.seq = 0;
	        exports.m=m;

          eid = {
            "v": 1,
            "seq": 0,
            "type": "req",
            "to": "controller.auth",
            "from": "user:-not-yet-authenticated-",
            "msg": {
              "command": "authenticate-me",
              "data": {
                "e_identity": "11fc510e17d8eff68fad62e1f9b1b50c2e5dae8ec3a413efaf9ea4b354ce16825988c78982196662efaf232b8eb820a56fa88b1ba033a85fa3cff3b29d865e231ce285ea1c38c42d7c813c572840210f0c3ff4c8da164884a39a5bfd6b537f8cf64ea79f74959288cfce91fdc275b3f25f2462565506ef290a14b0fda0f22c8b336736d344a89537656a573a55e95f18b22615ee258ba6dde866e6d5d5f2e2ed6d9fbc978342f7989b668cd4dceee60c47336a1bfcf390eed6ade292fcc39dff90d76de822112633c1067ff76f9177af9af44e2d6b40c8251f81159c6d395a7074c8a087b8d54b375f9e1095db74c2a7a4fc6ded7ac50cfd623d3dc4e0b82bcbe8cce377364db3c902ff071a4a246271a3d526fadc1c4b914051873590993261081cd50ef986353506633158437669b2",
                "e_role": null
              }
            }
          }
          exports.eid=eid;
