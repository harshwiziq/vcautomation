// This code is used for verifying web socket connection is successfull, by just making a web socket connection to a session 




var config=require('../../config/config.js');
var log=require('../../ext/Logger');

var WebSocket=require('ws');
process.env.NODE_TLS_REJECT_UNAUTHORIZED= "0";  // for handling tls error or CERT_HAS_EXPIRED error

module.exports=function(callback){
        // making a web socket connection
        var sock=new WebSocket(config.sessionurl);

        sock.on('open',function open() {

                sock.close();
                return callback(1,null);
        });

        sock.on('error',function error(error) {
		log.error({err:error},'Error occurs while connecting to web socket');
                return callback(0,error);
        });

}
