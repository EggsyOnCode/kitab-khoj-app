export type Book = {
  title: string;
  author: string;
  seller: BookShop;
  price: number;
  genre: String[];
  used: boolean;
  pub: string;
};

export type CatalogueBook = {
  id: number;
  title: string;
  author: string;
  price: number;
  genre: String[];
  used: boolean;
  publisher: string;
};

export type BookShop = {
  name: string;
  location: string;
};
