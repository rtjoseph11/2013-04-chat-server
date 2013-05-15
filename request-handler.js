var url = require("url");
/* You should implement your request handler function in this file.
 * But you need to pass the function to http.createServer() in
 * basic-server.js.  So you must figure out how to export the function
 * from this file and include it in basic-server.js. Check out the
 * node module documentation at http://nodejs.org/api/modules.html. */

exports.handleRequest = function(request, response) {
  console.log("Handling Request");
  var path = url.parse(request.url).pathname;
  var method = request.method;
  console.log(method,path);
  //if get
  if (method === "GET"){

  } else if (method === "POST"){

  } else {
    console.log("Unauthorized request");
  }

  //if post


};

//this is data
