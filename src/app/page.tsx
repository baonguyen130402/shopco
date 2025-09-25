import ProductListSec from "@/components/common/ProductListSec";
import "@/styles/flash-sale.css";
import Brands from "@/components/homepage/Brands";
import DressStyle from "@/components/homepage/DressStyle";
import Header from "@/components/homepage/Header";
import Reviews from "@/components/homepage/Reviews";
import { Product } from "@/types/product.types";
import { DummyJsonApi } from "@/services/dummyJsonApi";
import { transformDummyProductsToProducts } from "@/utils/productTransformer";
import { ReviewServices } from "@/services/reviewServices";

async function getProductsByRange(skip: number, limit: number): Promise<Product[]> {
  try {
    const response = await DummyJsonApi.getAllProducts(limit, skip);
    return transformDummyProductsToProducts(response.products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

async function getReviewsData() {
  try {
    return await ReviewServices.getRandomReviews(6);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    // Fallback to empty array or static data
    return [];
  }
}

export default async function Home() {
  // Fetch different sets of products for different sections and reviews
  const [flashSaleProducts, decorativeTileProducts, floorTileProducts, sanitaryProducts, reviewsData] = await Promise.all([
    getProductsByRange(0, 8),   // First 8 products for flash sale
    getProductsByRange(8, 8),   // Next 8 products for decorative tiles
    getProductsByRange(16, 8),  // Next 8 products for floor tiles  
    getProductsByRange(24, 8),  // Next 8 products for sanitary equipment
    getReviewsData(),           // Dynamic reviews from DummyJSON posts
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
