export class Book{
    constructor(
        public title: string,
        public pages: number,
        public author: string,
        public categories: string[],
        public id?: string,
        public image?: string
    ){}
} 