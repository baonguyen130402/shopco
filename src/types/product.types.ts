export type Discount = {
  amount: number;
  percentage: number;
};

export type Product = {
  id: number;
  title: string;
  description?: string;
  srcUrl: string;
  gallery?: string[];
  images?: string[];
  price: number;
  discount: Discount;
  rating: number;
  category?: string;
  brand?: string;
  stock?: number;
  thumbnail?: string;
};
