var rimraf = require('rimraf');
var fs = require('fs');

module.exports.flushAllDataTypes = (db) => {
    return db.collection('modified')
        .drop()
        .catch((err) => {
            if (err.message !== 'ns not found') {
                throw err; 
            }
        })
}

module.exports.flushDataType = (db, type) => {
    return db.collection('modified')
        .deleteOne({'collection': type});
}

module.exports.flushImages = (db) => {
    return new Promise((resolve, reject) => {
        var cardDir = __dirname + '/../../public/img/cards';
        rimraf(cardDir, (err) => {
            if (err) {
                reject(err);
            } else {
                if (!fs.existsSync(cardDir)){
                    fs.mkdirSync(cardDir);
                }
                resolve();
            }
        });
    });
}