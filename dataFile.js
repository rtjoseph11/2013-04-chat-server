var dataHash = {};
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
};