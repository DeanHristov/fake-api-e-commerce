export enum PRODUCT_CATEGORIES {
  ELECTRONIC = 'ELECTRONIC',
}

export type TCurrency = 'USD' | 'BGN' | 'EUR';

export enum USER_ROLES {
  ADMIN = 'admin',
  VISITOR = 'visitor',
}

export interface IComment {
  productId: string;
  _id: string;
  name: string;
  email: string;
  body: string;
  date: string;
}

// Object schema can be seen here: https://dummyjson.com/docs/products
export interface IProduct {
  _id: string;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images?: string[];
  comments?: IComment[];
}

export interface ICartProduct {
  _id: string;
  price: number;
  quantity: number;
  discountPercentage?: number;
  // TODO Fix next line!
  discountedPrice?: number;
  title: string;
  thumbnail: string;
  total: number;
  inStock: number;
}

export interface ICart {
  _id: string;
  userId: string;
  total: number;
  discountedTotal: number;
  totalProducts: number;
  totalQuantity: number;
  currency: TCurrency;
  products: ICartProduct[];
}

export interface IProductsResponse {
  products: IProduct[];
  total: number;
  skip: number;
  limit: number;
}

export interface ICartsResponse {
  carts: ICart[];
  total: number;
  skip: number;
  limit: number;
}

export interface IUser {
  _id: string;
  name: string;
  username: string;
  password: string;
  role: USER_ROLES;
  email: string;
}
