import {JsonController, Get, Redirect, NotFoundError} from "routing-controllers";
import {Service} from "typedi";

@Service()
@JsonController()
export class HelloWorldController {

    @Get("/")
    helloWorldAction(): string {
        return 'Hello world';
    }

    @Get("/redirect")
    @Redirect("https://www.google.cz")
    redirectAction(): string {
        return "https://www.seznam.cz";
    }

    @Get("/not-found")
    notFoundAction(): string {
        throw new NotFoundError();
    }
}
