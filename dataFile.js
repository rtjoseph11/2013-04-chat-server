var fs = require('fs');

var dataHash = fs.existsSync('data.txt') ? JSON.parse(fs.readFileSync('data.txt','utf8')) : {};
var id = 0;
exports.getData = function(key){
  return dataHash[key] || [];
};

exports.setData = function(key,message) {
  message.createdAt = new Date();
  message.objectId = id++;
  if (dataHash.hasOwnProperty(key)){
    dataHash[key].push(message);
  } else {
    dataHash[key] = [message];
  }
  console.log(dataHash[key]);
  fs.writeFile('data.txt',JSON.stringify(dataHash),"utf8",function(){
    console.log(JSON.stringify(dataHash));
  });
};