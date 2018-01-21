var connection = require('./modules/connection');
var flusher = require('./modules/flusher');
var argv = require('argv');

argv.option([
  {
      name: 'datatype',
      short: 'd',
      type: 'string'
  }
]);

var args = argv.run().options;

connection.open()
  .then((db) => {
    if (args.datatype && args.datatype.length) {
      if (args.datatype === 'images') {
        return flusher.flushImages(db);
      } else {
        return flusher.flushDataType(db, args.datatype);
      }
    } else {
      return flusher.flushAllDataTypes(db);
    }
  })
  .catch((err) => console.error(err.message))
  .then(connection.close);

