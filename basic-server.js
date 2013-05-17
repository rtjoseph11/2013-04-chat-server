var http = require("http");
var requestHandler = require("./request-handler.js");
var requestListener = function (request, response) {

  requestHandler.handleRequest(request, response);
};


var port = 8080;
var ip = "127.0.0.1";

var server = http.createServer(requestListener);
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);

