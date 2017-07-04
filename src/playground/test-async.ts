import * as http from "http"
import * as https from "https"
import * as urlLib from "url"
declare var Promise: any;

console.log("Starting...");

function downloadPage(url) {
    return new Promise(function (resolve, reject) {
        let urlObj = urlLib.parse(url);

        const options = {
            hostname: urlObj.hostname,
            path: urlObj.path,
            method: 'GET',
            headers: {
                'Content-Type': 'text/html'
            }
        };

        const requestFunction = urlObj.protocol == 'http:' ? http.request : https.request;

        const req = requestFunction(options, function (res) {
            res.setEncoding('utf8');

            let body = "";

            const { statusCode } = res;

            res.on('data', (chunk) => {
                body += chunk;
            });

            res.on('end', () => {
                if (statusCode == 200 || statusCode == 404) {
                    resolve(body);
                }
                else {
                    reject('Invalid status code: ' + statusCode);
                }
            });
        });

        req.on('error', (e) => {
            reject(`problem with request: ${e.message}`);
        });

        req.end();
    });
}

async function downloadAndOutput() {
    try {
        let result = await downloadPage("http://www.collabim.cz");

        console.log(result);
    }
    catch (e) {
        console.log(e);
    }
}

console.log('start');
downloadAndOutput();
console.log('end');
