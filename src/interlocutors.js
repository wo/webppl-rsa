// Javascript code goes here

var exampleJavascriptFn = function(x) {
  for (var i=0; i<10; i++) {
    x+=i;
  }
  return x;
}

module.exports = {
  // Adjust exports here
  exampleJavascriptFn: exampleJavascriptFn
}
