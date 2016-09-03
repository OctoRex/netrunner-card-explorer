

var p = new Promise((resolve, reject) => {
  resolve('test');
}).then(result => {
  console.log('then1: ' + result);
}).then(result => {
  console.log('then2: ' + result);
}).catch(reason => {
  console.log('catch:' + reason);
}).then(result => {
  console.log('then3: ' + result);
});