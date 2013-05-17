var url = require("url");
var dataFile = require("./dataFile.js");
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};
var headers = defaultCorsHeaders;
headers['Content-Type'] = "application/json";

exports.handleRequest = function(request, response) {
  console.log("Serving request type " + request.method + " for url " + request.url);
  var path = url.parse(request.url).pathname;
  var target = validatePath(path);
  if (!target){
    response.writeHead(404,headers);
    response.end("Invalid URL");
  } else {
    var method = request.method;
    var query = url.parse(request.url).query;
    if (method === "GET"){
      response.writeHead(200, headers);
      console.log("Responding to GET Request");
      response.end(JSON.stringify(dataFile.getData(target)));
    } else if (method === "POST"){
      // We expect UTF8
      request.setEncoding('utf8');
      var body = "";
      request.on('data', function(data){
        console.log(data, typeof data);
        body += data;
      });
      request.on('end', function(data){
        console.log("DATA DOWNLOADED");
        //need to add a try catch on the JSON parse
        console.log(body);
        try{
          dataFile.setData(target,JSON.parse(body));
          response.writeHead(201, headers);
        } catch (e) {
          response.writeHead(400, headers);
          console.log(e);
        } finally {
          response.end(JSON.stringify('\n'));
        }
      });
    } else if (method === "OPTIONS") {
      response.writeHead(200, headers);
      response.end();
    }else {
      response.writeHead(501, headers);
      console.log("Unauthorized request");
      response.end();
    }
  }
};

var validatePath = function(path){
  var components = path.split('/');
  console.log(components);
  if(components[1] === 'classes'){
    return components[2];
  } else {
    console.log("Invalid URL");
    return undefined;
  }
};

