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
      response.end(JSON.stringify(dataFile.getData(target)));
    }
  },
  {
    pattern: /[^+]*/,
    method: function(request, response){
      response.writeHead(404, headers);
      response.end(JSON.stringify('\n'));
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
        body += data;
      });
      request.on('end', function(data){
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
      response.end(JSON.stringify('\n'));
    }
  }
  ],
  "OPTIONS" : [
  {
    pattern:/[^+]*/,
    method: function(request, response){
      response.writeHead(200, headers);
      response.end(JSON.stringify('\n'));
    }
  }
  ],
  "DELETE": [
  {
    pattern:/[^+]*/,
    method: function(request, response){
      response.writeHead(501, headers);
      response.end(JSON.stringify('\n'));
    }
  }
  ],
  "PUT": [
  {
    pattern:/[^+]*/,
    method: function(request, response){
      response.writeHead(501, headers);
      response.end(JSON.stringify('\n'));
    }
  }
  ]
};

exports.trailblazer = function(pathname,method,request,response){
  routes[method].some(function(item){
    var matches = pathname.match(item.pattern);
    if (matches){
      item.method.apply(null, [request, response].concat(matches.slice(1)));
      return true;
    }
  });
};


