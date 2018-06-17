module.exports = {

  // abstract away the saving
  save : (db, items, dataType) => {
    console.log('Adding ' + dataType);
    // drop the collection first, so we don't end up with duplicates
    var collection = db.collection(dataType);
    return collection.drop()
      .catch((err) => null)
      .then(() => collection.insertMany(items));
  },

  // this needs to be separate as the cards run needs to only mark cards
  // as done once all 3 bits have been sorted
  markModified : (db, dataType) => {
    return db.collection('modified')
      .insertOne({'collection': dataType, 'modified': Date.now()});
  },

  // get the last time they were modified (null if none) so that we can
  // save ourselves an import from NRDB
  modifiedTime : (db, dataType) => {
    return db.collection('modified')
        .findOne({'collection': dataType})
        .then((doc) => {
          if (doc && typeof doc.modified != 'undefined') {
            return doc.modified;
          }
        })
        .catch(() => console.log(`Modified time not found for ${dataType}`));
  }
};
