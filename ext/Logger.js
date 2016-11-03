//  Here generates a log file with name contains current date and time UTC
//  exports the bunyan logger object

var bunyan=require('bunyan');

var date=new Date();
var da=date.getUTCHours() + ":" + date.getUTCMinutes()+"_"+date.getUTCDate()+ "_" + (date.getUTCMonth()+1) +"_"+date.getUTCFullYear()
var log=bunyan.createLogger({

	name:"vcautomation",
	streams:[
		{ path:__dirname+'/LogFiles/'+da+'.log'},
		{ stream:process.stdout} 
	]
});
module.exports=log;
