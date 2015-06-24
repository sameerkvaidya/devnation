var http = require('http');
var exec = require('child_process').exec;
var fs = require('fs');
var url = require('url');
var sleep = require('sleep');



var CAM_ID = 101;
var action = 'status';

/**
 * server listening 
 */
http.createServer(function(req, res){

	if(req.method === 'GET'){
		var path = url.parse(req.url).pathname;
		var ret = "";
		path = path.split('/')[1];

		
		try{
			ret = service[path]();
		}catch(err){
			console.log(err);
			ret = service['status']();
		}
	
		res.end(ret);	

	}



}).listen(1438);



function callback(response){
 

	response.on('data', function(chunk){
	 	console.log('action is :'+JSON.parse(chunk).action);
	 	action = JSON.parse(chunk).action;
 	});

 	response.on('end', function () {
	   console.log('end of response');
	   service[action]();
 	});

}

function poll(){
	var options = {
	  host: POLLING_SERVER,
	  path: '/poll',
	  port: POLLING_SERVER_PORT,
	  method: 'GET'
	};

	http.request(options, callback).end();
}

var service = {
	status: function(){
		return "DEVICE ID : "+CAM_ID;
	},
}



