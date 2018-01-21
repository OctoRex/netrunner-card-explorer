var Promise = require('bluebird');
var request = require('request');
var fs = require('fs');

function localImgPath(card) {
    return `${__dirname}/../../public/img/cards/${card.code}.png`;
}

function hasImg(card) {
    return fs.existsSync(localImgPath(card));
}

function saveImg(card) {
    return new Promise((resolve, reject) => {
        var localPath = localImgPath(card);        
        var stream = request(card.image_url);
        stream.on('error', (err) =>reject(err));
        stream.on('response', (response) => {
            if(response.statusCode === 200) {
                stream.pipe(fs.createWriteStream(localPath));
                stream.on('end', () => resolve());
            }
        })
    });
}

module.exports = (db) => {
    return db.collection('cards')
        .find()
        .toArray()
        .then((cards) => {
            return Promise.resolve(cards)
                .each((card) => {
                    if (!hasImg(card)) {
                        return saveImg(card);
                    } else {
                        return Promise.resolve();
                    }
                });
        })
}