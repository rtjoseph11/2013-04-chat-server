var dataHash = {};

exports.getData = function(key){
  return dataHash[key];
};

exports.setData = function(key,message) {
  if (dataHash.hasOwnProperty(key)){
    dataHash[key].push(message);
  } else {
    dataHash[key] = [message];
  }
};