var dataFile = require("./dataFile.js");
var fs = require("fs");
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};
var headers = defaultCorsHeaders;


var routes = {
  "GET" : [
  {
    pattern: /^\/classes\/([a-z0-9]+)$/i,
    method: function(request, response, target){
      headers['Content-Type'] = "application/json";
      response.writeHead(200, headers);
      response.end(JSON.stringify(dataFile.getData(target)));
    }
  },
  {
    pattern: /\/$/,
    method: function(request,response){
      fs.readFile('chatClient/index.html', 'utf8', function(err,data){
      headers['Content-Type'] = "text/html";
      response.writeHead(200,headers);
        response.end(data);
      });
    }
  },
  {
    pattern:/([^+]*)\.([^+]*)/,
    method: function(request,response, path, filetype){
      fs.readFile('chatClient/' + path + '.' + filetype, 'utf8', function(err,data){
      headers['Content-Type'] = "text/" + filetype;
      response.writeHead(200,headers);
        response.end(data);
      });
    }
  },
  {
    pattern: /[^+]*/,
    method: function(request, response, target){
      headers['Content-Type'] = "application/json";
      response.writeHead(404, headers);
      response.end(JSON.stringify('\n'));
    }
  }
  ],
  "POST" : [
   {
     pattern: /^\/classes\/([a-z0-9]+)$/i,
     method: function(request, response, target){
      headers['Content-Type'] = "application/json";
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
      headers['Content-Type'] = "application/json";
      response.writeHead(404, headers);
      response.end(JSON.stringify('\n'));
    }
  }
  ],
  "OPTIONS" : [
  {
    pattern:/[^+]*/,
    method: function(request, response){
      headers['Content-Type'] = "application/json";
      response.writeHead(200, headers);
      response.end(JSON.stringify('\n'));
    }
  }
  ],
  "DELETE": [
  {
    pattern:/[^+]*/,
    method: function(request, response){
      headers['Content-Type'] = "application/json";
      response.writeHead(501, headers);
      response.end(JSON.stringify('\n'));
    }
  }
  ],
  "PUT": [
  {
    pattern:/[^+]*/,
    method: function(request, response){
      headers['Content-Type'] = "application/json";
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


