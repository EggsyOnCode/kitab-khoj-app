import { Book, BookShop } from "../Book";

const bookShop: BookShop = {
  name: "Bookstore XYZ",
  location: "123 Main Street, City",
};

export const book: Book = {
  title: "Harry Potter",
  author: "John Doe",
  seller: bookShop,
  price: 10.99,
  genre: ["Fiction", "Mystery"],
  used: false  ,
  pub: "Penguin Books"
};


export const books: Book[] = [
  // ...existing books
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    seller: bookShop,
    price: 9.99,
    genre: ["Classic", "Fiction"],
    used: false,
    pub: "J.B. Lippincott & Co.",
  },
  {
    title: "1984",
    author: "George Orwell",
    seller: bookShop,
    price: 11.49,
    genre: ["Dystopian", "Political Fiction"],
    used: true,
    pub: "Secker & Warburg",
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    seller: bookShop,
    price: 12.79,
    genre: ["Literary Fiction"],
    used: false,
    pub: "Little, Brown and Company",
  },
];
