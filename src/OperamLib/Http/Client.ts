import {Service} from "typedi";
import {Config} from "./Config";
import * as http from "http"
import * as https from "https"
import {Response} from "./Response";
import * as urlLib from "url"
declare var Promise: any;


@Service()
export class Client {

    request(config: Config): Promise<Response> {
        return new Promise(function (resolve, reject) {
            let urlObj = urlLib.parse(config.getUrl());

            const options = {
                hostname: urlObj.hostname,
                path: urlObj.path,
                method: config.getMethod(),
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
                        let response = new Response(body, res.headers);

                        resolve(response);
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
}
