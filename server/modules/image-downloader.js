var Promise = require('bluebird');
var request = require('request');
var fs = require('fs');
var util = require('util');
var verbose = false;

function localImgPath(card) {
    return `${__dirname}/../../public/img/cards/${card.code}.png`;
}

function hasImg(card) {
    try {
        return fs.statSync(localImgPath(card));
    } catch (e) {
        return null;
    }
}

function saveImg(card) {
    return new Promise((resolve, reject) => {
        var localPath = localImgPath(card);
        if (verbose) {
            console.log(`${card.title}: downloading image ${card.image_url}`);
        }
        var stream = request(card.image_url);
        stream.on('error', (err) => reject(err));
        stream.on('response', (response) => {
            if(response.statusCode === 200) {
                stream.pipe(fs.createWriteStream(localPath));
                stream.on('end', () => {
                    if (verbose) {
                        console.log(`${card.title}: image downloaded`);
                    }
                    resolve(card);
                });
            } else {
                var err = `${card.title}: ${card.image_url} not OK`;
                console.error(err);
                reject(err);
            }
        })
    });
}

function hasBadImg(stat) {
    return stat.size < 5000;
}

function removeImg(card) {
    return fs.unlinkSync(localImgPath(card));
}

function processImg(card) {
    if (verbose) {
        console.log(`${card.title}: processing`);
    } 
    var stat = hasImg(card);
    if (stat) {
        if (hasBadImg(stat)) {
            if (verbose) {
                console.log(`${card.title}: removing bad img`);
            }
            removeImg(card);
            return saveImg(card);
        } else {
            return Promise.resolve();
        }
    } else {
        return saveImg(card);
    }
}

module.exports = (db, v) => {
    verbose = v;
    var failures = false;
    return db.collection('cards')
        .find()
        .toArray()
        .then((cards) => {
            return Promise.map(cards, (card) => {
                return processImg(card)
                    .catch((e) => {
                        failures = true;
                        console.error(e)
                    })
            }, {concurrency: 3});
        })
        .then(() => {
            if (failures) {
                throw new Error('One or more images failed');
            }
        })
        .then(() => {
            console.log('Image import finished successfully');
        });
}