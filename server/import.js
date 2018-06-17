var connection = require('./modules/connection');
var importer = require('./modules/importer');
var images = require('./modules/image-downloader')
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
        return images(db);
      } else {
        return importer[args.datatype](db);
      }
    } else {
      return Promise.all([
        importer.cards(db),
        importer.types(db),  
        importer.sets(db), 
        importer.factions(db)
      ])
      .then(() => {
        return images(db);
      });
    }
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .then(() => {
    connection.close();
    process.exit(0);
  });