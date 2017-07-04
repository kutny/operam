import Category from "../Category/Category";

export class Post {

    createDate: Date = new Date();

    constructor(public id: number, public title: string, public text: string, public categories: Category[]) {

    }
}
