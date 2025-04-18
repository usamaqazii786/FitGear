export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}