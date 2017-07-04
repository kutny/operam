import {JsonController, Get, QueryParam} from "routing-controllers";
import {Service} from "typedi";
import {Config} from "../../OperamLib/Http/Config";
import {Client} from "../../OperamLib/Http/Client";

@Service()
@JsonController()
export class DownloaderController {

    constructor(private httpClient: Client) {
    }

    @Get("/download")
    async downloadAction(@QueryParam("url") url: string): Promise<string> {
        console.log(url);

        let config = new Config(url);

        let response = await this.httpClient.request(config);

        return response.getBody();
        // return JSON.stringify(response.getHeaders());
    }
}
