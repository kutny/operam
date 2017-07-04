import {JsonController, Get, Post, Param, Delete, Body} from "routing-controllers";
import {Service} from "typedi";
import CategoryRepository from "./CategoryRepository";
import Category from "./Category";

@Service()
@JsonController()
export class CategoryController {

    constructor(private categoryRepository: CategoryRepository) {
    }

    @Get("/categories")
    categoryListAction(): Promise<Category[]> {
        return this.categoryRepository.findAll();
    }

    @Get("/categories/:id")
    categoryDetailAction(@Param("id") id: number): Category {
        return this.categoryRepository.findOne(id);
    }

    @Post("/categories")
    createCategoryAction(@Body() category: Category): Category {
        return this.categoryRepository.save(category);
    }

    @Delete("/categories/:id")
    deleteCategoryAction(@Param("id") id: number): Category {
        return this.categoryRepository.remove(id);
    }
}
