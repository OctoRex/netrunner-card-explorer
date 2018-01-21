var MongoClient = require('mongodb').MongoClient;
var client;

module.exports.open = () => {
    return MongoClient.connect('mongodb://localhost')
        .then((connection) => { 
            client = connection;
            return client.db('blackat'); 
        });
}

module.exports.close = () => {
    if (client) {
        client.close();
    }
}