export class Response {

    constructor(private body: string, private headers: string[]) {
    }

    getBody() {
        return this.body;
    }

    getHeaders() {
        return this.headers;
    }
}
