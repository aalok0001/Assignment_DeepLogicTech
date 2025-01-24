const https = require('https');

function fetchData(url, callback) {
    https.get(url, (resp) => {
        let data = '';

        resp.on('data', (chunk) => {
            data += chunk;
        });

        resp.on('end', () => {
            callback(null, data);
        });

    }).on("error", (err) => {
        callback(err);
    });
}

module.exports = fetchData;
