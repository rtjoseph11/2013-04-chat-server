var url = require("url");
var router = require("./router.js");

exports.handleRequest = function(request, response) {
  console.log("Serving request type " + request.method + " for url " + request.url);
  var path = url.parse(request.url).pathname;
  router.trailblazer(path,request.method,request,response);
};
