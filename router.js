var dataFile = require("./dataFile.js");
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};
var headers = defaultCorsHeaders;
headers['Content-Type'] = "application/json";

var routes = {
  "GET" : [
  {
    pattern: /^\/classes\/([a-z0-9]+)$/i,
    method: function(request, response, target){
      response.writeHead(200, headers);
      console.log("Responding to GET Request");
      response.end(JSON.stringify(dataFile.getData(target)));
    }
  },
  {
    pattern: /[^+]*/,
    method: function(request, response){
      response.writeHead(404, headers);
      response.end();
    }
  }
  ],
  "POST" : [
   {
     pattern: /^\/classes\/([a-z0-9]+)$/i,
     method: function(request, response, target){
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
     }
   },
   {
    pattern: /[^+]*/,
    method: function(request, response){
      response.writeHead(404, headers);
      response.end();
    }
  }
  ],
  "OPTIONS" : [
  {
    pattern:/[^+]*/,
    method: function(request, response){
      console.log("OPTIONS");
      response.writeHead(200, headers);
      response.end();
    }
  }
  ]
};

exports.trailblazer = function(pathname,method,request,response){
  routes[method].some(function(item){ //test for routes[method] to return 404 not found
    var matches = pathname.match(item.pattern);
    if (matches){
      item.method.apply(null, [request, response].concat(matches.slice(1)));
      return true;
    }
  });
};


