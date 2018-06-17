var nrdb = require('./nrdb');
var queries = require('./import-queries');
var cleaner = require('./cleaner');

module.exports.cards = (db, verbose) => {
    // cards and subtypes (which needs to be parsed from cards)
    // get the modified time
    return queries.modifiedTime(db, 'cards')
        .then((result) => {
            if (verbose) {
                console.log('Importing cards');
            }
            return nrdb('/cards', result);
        })
        .then((data) => {
            return Promise.resolve(data)
                // then parse and save the JSON
                .then(JSON.parse)
                .then((data) => {
                    if (verbose) {
                        console.log('Cleaning cards');
                    }
                    // allow the cleaner to filter out bits and bobs
                    var cards = cleaner.cards(data.data, data.imageUrlTemplate);
                    if (verbose) {
                        console.log('Getting subtypes');
                    }
                    // then parse/save the subtypes data
                    var subtypes = cleaner.subtypes(data.data);
                    if (verbose) {
                        console.log('Saving cards and subtypes');
                    }
                    return queries.save(db, cards, 'cards')
                        .then(() =>  queries.save(db, subtypes, 'subtypes'));
                })
                // after both we can mark these as modified
                .then(() => queries.markModified(db, 'cards'))
                .then(() => queries.markModified(db, 'subtypes'))
                // we want to return true on the error regarless so we 
                .catch(err => console.error(`Error with cards and subtypes ${err.message}`));
        })
        .catch(console.error);
}

module.exports.types = (db, verbose) => {
    // types is a direct API call
    return queries.modifiedTime(db, 'types')
        .then((result) => {
            if (verbose) {
                console.log('Importing types');
            }
            return nrdb('/types', result);
        })
        .then((data) => {
            return Promise.resolve(data)
                // then parse and save the JSON
                .then(JSON.parse)
                .then((data) => {
                    if (verbose) {
                        console.log('Cleaning items');
                    }
                    var items = cleaner.types(data.data);
                    if (verbose) {
                        console.log('Saving items');
                    }
                    return queries.save(db, items, 'types');
                })
                .then(() => queries.markModified(db, 'types'))
                .catch(err => console.error(`Error with types ${err.message}`));
        })
        .catch(console.error);
}

module.exports.sets = (db, verbose) => {
    // types is a direct API call
    return queries.modifiedTime(db, 'sets')
        .then((result) => {
            if (verbose) {
                console.log('Importing packs');
            }
            return nrdb('/packs', result);
        })
        .then((data) => {
            return Promise.resolve(data)
                // then parse and save the JSON
                .then(JSON.parse)
                .then((data) => {
                    if (verbose) {
                        console.log('Cleaning sets');
                    }
                    var items = cleaner.sets(data.data);
                    if (verbose) {
                        console.log('Saving sets');
                    }
                    return queries.save(db, items, 'sets');
                })
                .then(() => queries.markModified(db, 'sets'))
                .catch(err => console.error(`Error with sets ${err.message}`));
        })
        .catch(console.error);
}

module.exports.factions = (db, verbose) => {
    // types is a direct API call
    return queries.modifiedTime(db, 'factions')
        .then((result) => {
            if (verbose) {
                console.log('Importing factions');
            }
            return nrdb('/factions', result);
        })
        .then((data) => {
            return Promise.resolve(data)
            // then parse and save the JSON
            .then(JSON.parse)
            .then((data) => {
                if (verbose) {
                    console.log('Cleaning factions');
                }
                var items = cleaner.factions(data.data);
                if (verbose) {
                    console.log('Saving factions');
                }
                return queries.save(db, items, 'factions');
            })
            .then(() => queries.markModified(db, 'factions'))
            .catch(err => console.error(`Error with factions ${err.message}`));
        })
        .catch(console.error);
}
