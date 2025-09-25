import axios from 'axios';
import { DummyPost, DummyPostsResponse, DummyUser } from '@/types/post.types';

const BASE_URL = process.env.API_URL;

export interface DummyProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface DummyProductsResponse {
  products: DummyProduct[];
  total: number;
  skip: number;
  limit: number;
}

export class DummyJsonApi {
  static async getAllProducts(limit = 30, skip = 0): Promise<DummyProductsResponse> {
    try {
      const response = await axios.get(`${BASE_URL}/products?limit=${limit}&skip=${skip}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  static async getProductById(id: number): Promise<DummyProduct> {
    try {
      const response = await axios.get(`${BASE_URL}/products/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  }

  static async getProductsByCategory(category: string, limit = 10): Promise<DummyProductsResponse> {
    try {
      const response = await axios.get(`${BASE_URL}/products/category/${category}?limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching products by category:', error);
      throw error;
    }
  }

  static async getAllPosts(limit = 30, skip = 0): Promise<DummyPostsResponse> {
    try {
      const response = await axios.get(`${BASE_URL}/posts?limit=${limit}&skip=${skip}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  }

  static async getUserById(id: number): Promise<DummyUser> {
    try {
      const response = await axios.get(`${BASE_URL}/users/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }
}
