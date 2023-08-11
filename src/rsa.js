// Eexported functions can be accessed in rsa.wppl as webpplRsa.<functionName>

var numAgents = 0;

var getNewAgentId = function() {
  numAgents++;
  return numAgents;
}

var addAgentId = function(list, id) {
  // adds agentId property to each element of list
  return list.map(function(x) {
    if (typeof x === 'string') {
      // if x is a string, recreate as String object so that we can add custom
      // properties:
      x = new String(x);
    }
    x.agentId = id;
    return x;
  });
}

module.exports = {
  getNewAgentId: getNewAgentId,
  addAgentId: addAgentId
}
