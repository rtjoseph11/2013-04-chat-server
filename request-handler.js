var url = require("url");
var dataFile = require("./dataFile.js");
/* You should implement your request handler function in this file.
 * But you need to pass the function to http.createServer() in
 * basic-server.js.  So you must figure out how to export the function
 * from this file and include it in basic-server.js. Check out the
 * node module documentation at http://nodejs.org/api/modules.html. */

exports.handleRequest = function(request, response) {
  console.log("Handling Request");
  var path = url.parse(request.url).pathname;
  var target = validatePath(path);
  if (!target){
    ///update response to have error code
  } else {
    var method = request.method;
    var query = url.parse(request.url).query;
    if (method === "GET"){
      console.log("Responding to GET Request");
      response.end(JSON.stringify(dataFile.getData(target)));
    } else if (method === "POST"){
      var body = "";
      request.on('end', function(data){
        console.log("DATA DOWNLOADED");
        dataFile.setData(target,JSON.parse(body));
      });
      request.on('data', function(data){
        body += data;
      });
    } else if (method === "OPTIONS") {
    }else {
      console.log("Unauthorized request");
    }
  }
};

var validatePath = function(path){
  var components = path.split('/');
  if(components[1] === '1' && components[2] === 'classes'){
    return components[3];
  } else {
    console.log("Invalid URL");
    return undefined;
  }
};