import { Book, BookShop } from "../Book";

const bookShop: BookShop = {
  name: "Bookstore XYZ",
  location: "123 Main Street, City",
};

export const book: Book = {
  title: "Sample Book",
  author: "John Doe",
  seller: bookShop,
  price: 10.99,
  genre: ["Fiction", "Mystery"],
  used: false   
};
