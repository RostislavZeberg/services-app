export interface Service {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
}

export interface CartItem extends Service {
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  total: number;
}