var connection = require('./modules/connection');
var importer = require('./modules/importer');
var images = require('./modules/image-downloader')
var argv = require('argv');

argv.option([
  {
      name: 'datatype',
      short: 'd',
      type: 'string'
  },
  {
      name: 'verbose',
      short: 'v',
      type: 'boolean'
  }
]);

var args = argv.run().options;

connection.open()
  .then((db) => {

    var verbose = args.verbose;

    if (args.datatype && args.datatype.length) {
      if (args.datatype === 'images') {
        return images(db, verbose);
      } else {
        return importer[args.datatype](db, verbose);
      }
    } else {
      return Promise.all([
        importer.cards(db, verbose),
        importer.types(db, verbose),  
        importer.sets(db, verbose), 
        importer.factions(db, verbose)
      ])
      .then(() => {
        return images(db, verbose);
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