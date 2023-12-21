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

export type CustomerCatalog = {
  id: number;
  title: string;
  author: string;
  price: number;
  genre: String[];
  used: boolean;
  publisher: string;
  store: string;
  store_location: string
};

export type OrderedBook = {
  //rep order num
  id: number,
  title: string,
  author: string,
  price: string,
  publisher: string
  store: string,
  store_location : string
}

export type ShopOrders = {
  //rep order num
  id: number;
  title: string;
  author: string;
  price: string;
  publisher: string;
  customer: string,
  delivery_location: string
};

export type BookShop = {
  name: string;
  location: string;
};
