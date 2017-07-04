export class Config {

    constructor(private url: string) {
    }

    getUrl() {
        return this.url;
    }

    getMethod() {
        return 'GET';
    }
}
