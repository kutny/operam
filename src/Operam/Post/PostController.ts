import {JsonController, Get, Post as HttpPost, Param, Delete, Body} from "routing-controllers";
import {Service} from "typedi";
import {PostRepository} from "./PostRepository";
import {Post} from "./Post";

@Service()
@JsonController()
export class PostController {

    constructor(private postRepository: PostRepository) {
    }

    @Get("/posts")
    postListAction(): Promise<Post[]> {
        return this.postRepository.findAll();
    }

    @Get("/posts/:id")
    postDetailAction(@Param("id") id: number): Post {
        return this.postRepository.findOne(id);
    }

    @HttpPost("/posts")
    savePostAction(@Body() post: Post): Post {
        return this.postRepository.save(post);
    }

    @Delete("/posts/:id")
    deletePostAction(@Param("id") id: number): Post {
        return this.postRepository.remove(id);
    }
}
