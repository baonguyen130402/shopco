import ProductListSec from "@/components/common/ProductListSec";
import "@/styles/flash-sale.css";
import Brands from "@/components/homepage/Brands";
import DressStyle from "@/components/homepage/DressStyle";
import Header from "@/components/homepage/Header";
import Reviews from "@/components/homepage/Reviews";
import { Product } from "@/types/product.types";
import { DummyJsonApi } from "@/services/dummyJsonApi";
import { transformDummyProductsToProducts } from "@/utils/productTransformer";
import { reviewsData } from "@/data/reviewsData";

async function getProductsByRange(skip: number, limit: number): Promise<Product[]> {
  try {
    const response = await DummyJsonApi.getAllProducts(limit, skip);
    return transformDummyProductsToProducts(response.products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export default async function Home() {
  // Fetch different sets of products for different sections
  const [flashSaleProducts, decorativeTileProducts, floorTileProducts, sanitaryProducts] = await Promise.all([
    getProductsByRange(0, 4),   // First 4 products for flash sale
    getProductsByRange(4, 4),   // Next 4 products for decorative tiles
    getProductsByRange(8, 4),   // Next 4 products for floor tiles  
    getProductsByRange(12, 4),  // Next 4 products for sanitary equipment
  ]);

  return (
    <>
      <Header />
      <Brands />
      <main className="my-[50px] sm:my-[72px]">
        <ProductListSec
          title={<span className="flash-sale-animate">FLASH SALE</span>}
          data={flashSaleProducts}
          viewAllLink="/shop#new-arrivals"
        />
        <div className="max-w-frame mx-auto px-4 xl:px-0">
          <hr className="h-[1px] border-t-black/10 my-10 sm:my-16" />
        </div>
        <div className="mb-[50px] sm:mb-20">
          <ProductListSec
            title="GẠCH TRANG TRÍ"
            data={decorativeTileProducts}
            viewAllLink="/shop#top-selling"
          />
        </div>
        <ProductListSec
          title="GẠCH ỐP LÁT"
          data={floorTileProducts}
          viewAllLink="/shop#new-arrivals"
        />
        <div className="max-w-frame mx-auto px-4 xl:px-0">
          <hr className="h-[1px] border-t-black/10 my-10 sm:my-16" />
        </div>
        <div className="mb-[50px] sm:mb-20">
          <ProductListSec
            title="THIẾT BỊ VỆ SINH"
            data={sanitaryProducts}
            viewAllLink="/shop#top-selling"
          />
        </div>
        <div className="mb-[50px] sm:mb-20">
          <DressStyle />
        </div>
        <Reviews data={reviewsData} />
      </main>
    </>
  );
}
