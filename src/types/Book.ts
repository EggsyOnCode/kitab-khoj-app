export type Book = {
    title: string,
    author: string,
    seller: BookShop
    price: number,
    genre : String[]
    used: boolean
}

export type BookShop = {
    name: string,
    location: string,
}