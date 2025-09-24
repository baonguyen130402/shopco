import { Product } from '@/types/product.types';
import { DummyProduct } from '@/services/dummyJsonApi';

export function transformDummyProductToProduct(dummyProduct: DummyProduct): Product {
  return {
    id: dummyProduct.id,
    title: dummyProduct.title,
    srcUrl: dummyProduct.thumbnail,
    gallery: dummyProduct.images,
    price: dummyProduct.price,
    discount: {
      amount: 0,
      percentage: dummyProduct.discountPercentage || 0,
    },
    rating: dummyProduct.rating,
  };
}

export function transformDummyProductsToProducts(dummyProducts: DummyProduct[]): Product[] {
  return dummyProducts.map(transformDummyProductToProduct);
}