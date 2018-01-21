var request = require('request');

module.exports = (url, modified) => {

    var headers = {};
   
    // if we provide this header then NRDB will let us know when there's
    // no new data so we don't have to bother processing them
    if (modified) {
      headers['If-Modified-Since'] = new Date(modified).toUTCString();
    }
    
    var options = {
      url: `https://netrunnerdb.com/api/2.0/public${url}`,
      headers: headers
    };
    
    // return the request as a promise
    return new Promise((resolve, reject) => {
      request(options, (error, response, body) => {
        if (!error && response.statusCode == 200 && body) {
          console.log('New data from NRDB!');
          resolve(body);
        } else {
          reject(`NRDB had no new data: ${options.url} - ${response.statusCode}`);
        }
      }); 
    });
  }