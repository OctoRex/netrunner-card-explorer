var Promise = require('bluebird');
var request = require('request');
var fs = require('fs');
var util = require('util');

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
        var stream = request(card.image_url);
        stream.on('error', (err) => reject(err));
        stream.on('response', (response) => {
            if(response.statusCode === 200) {
                stream.pipe(fs.createWriteStream(localPath));
                stream.on('end', () => {
                    console.log('%s: image downloaded', card.title);
                    resolve(card);
                });
            } else {
                reject(util.format('%s: %s not OK', 
                    card.title, card.image_url));
            }
        })
    });
}

function hasBadImg(stat) {
    return stat.size < 5000;
}

function removeImg(card) {
    console.log('%s: removing bad img', card.title);
    return fs.unlinkSync(localImgPath(card));
}

function processImg(card) {
    console.log('%s: processing', card.title);
    var stat = hasImg(card);
    if (stat) {
        if (hasBadImg(stat)) {
            removeImg(card);
            return saveImg(card);
        } else {
            return Promise.resolve();
        }
    } else {
        return saveImg(card);
    }
}

module.exports = (db) => {
    return db.collection('cards')
        .find()
        .toArray()
        .then((cards) => {
            return Promise.resolve(cards)
                .each(processImg);
        })
        .then(() => {
            console.log('Image import finished successfully');
        });
}