import {JsonController, Get, Param} from "routing-controllers";
import {Service} from "typedi";

@Service()
@JsonController()
export class RedirectorController {

    private hashes = {
        "ahoj": "http://www.seznam.cz"
    };

    @Get("/r/:hash")
    ahojAction(@Param("hash") hash: string): string {
        if (typeof(this.hashes[hash]) === "undefined") {
            return "http://www.nic.cz";
        }

        let finalUrl = this.hashes[hash];

        return `
        <html xmlns="http://www.w3.org/1999/xhtml">    
          <head>      
            <title>Operam redirector</title>      
            <meta http-equiv="refresh" content="2;URL='${finalUrl}'" />    
          </head>    
          <body> 
            You will be redirected in 2 seconds
          </body>  
        </html>
        `

    }
}
