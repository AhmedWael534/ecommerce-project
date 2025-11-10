export interface User {
  name: string;
  email: string;
  role?: string;
}

export interface AuthResponse {
  message: string;
  user?: User;
  token: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Product {
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  imageCover: string;
  category: Category;
  brand: Brand;
  ratingsAverage: number;
  // Add other fields as needed
}

export interface CartItem {
  count: number;
  _id: string;
  product: Product;
  price: number;
}

export interface Cart {
  _id: string;
  cartOwner: string;
  products: CartItem[];
  totalCartPrice: number;
}

export interface Address {
  _id?: string;
  name: string;
  details: string;
  phone: string;
  city: string;
}