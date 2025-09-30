import BreadcrumbShop from "@/components/shop-page/BreadcrumbShop";
import { Metadata } from "next";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MobileFilters from "@/components/shop-page/filters/MobileFilters";
import Filters from "@/components/shop-page/filters";
import { FiSliders } from "react-icons/fi";
import ProductCard from "@/components/common/ProductCard";
import { DummyJsonApi } from "@/services/dummyJsonApi";
import { transformDummyProductsToProducts } from "@/utils/productTransformer";
import ShopPagination from "@/components/shop-page/ShopPagination";

export const metadata: Metadata = {
  title: "Cửa Hàng Gạch Ốp Lát & Nội Thất - TPHOME",
  description: "Khám phá bộ sưu tập gạch ốp lát, gạch trang trí, thiết bị vệ sinh và đồ nội thất cao cấp tại TPHOME. Hàng nghìn sản phẩm chất lượng với giá tốt nhất.",
  keywords: [
    "cửa hàng gạch ốp lát",
    "mua gạch online",
    "gạch trang trí giá rẻ",
    "thiết bị vệ sinh online",
    "shop nội thất",
    "gạch ceramic chất lượng",
    "lavabo cao cấp",
    "bồn cầu giá tốt",
    "trang trí nội thất",
    "TPHOME shop"
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://tphome.vn/shop",
    siteName: "TPHOME",
    title: "Cửa Hàng Gạch Ốp Lát & Nội Thất - TPHOME",
    description: "Khám phá bộ sưu tập gạch ốp lát, gạch trang trí, thiết bị vệ sinh và đồ nội thất cao cấp tại TPHOME.",
    images: [
      {
        url: "/images/shop-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TPHOME Shop - Gạch Ốp Lát & Nội Thất",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cửa Hàng Gạch Ốp Lát & Nội Thất - TPHOME",
    description: "Khám phá bộ sưu tập gạch ốp lát, gạch trang trí, thiết bị vệ sinh và đồ nội thất cao cấp.",
    images: ["/images/shop-og-image.jpg"],
  },
  alternates: {
    canonical: "https://tphome.vn/shop",
  },
  category: "E-commerce",
};

const PRODUCTS_PER_PAGE = 9;

async function getShopProducts(page: number = 1, searchQuery: string = '') {
  try {
    const skip = (page - 1) * PRODUCTS_PER_PAGE;
    const response = await DummyJsonApi.getAllProducts(100, 0); // Get more products for search
    let allProducts = transformDummyProductsToProducts(response.products);
    
    // Filter products if search query exists
    if (searchQuery.trim()) {
      const lowercaseQuery = searchQuery.toLowerCase().trim();
      
      allProducts = allProducts.filter(product => {
        // Search in product title
        const titleMatch = product.title.toLowerCase().includes(lowercaseQuery);
        
        // Search in product description
        const descriptionMatch = product.description?.toLowerCase().includes(lowercaseQuery);
        
        // Search in product category
        const categoryMatch = product.category?.toLowerCase().includes(lowercaseQuery);
        
        // Search in Vietnamese keywords
        const vietnameseKeywords = [
          'gạch ốp lát', 'gạch trang trí', 'thiết bị vệ sinh', 'lavabo', 'bồn cầu',
          'vòi sen', 'đèn trang trí', 'phụ kiện', 'gương', 'tủ lavabo',
          'gạch ceramic', 'gạch granite', 'nội thất', 'phòng tắm', 'phòng khách'
        ];
        
        const keywordMatch = vietnameseKeywords.some(keyword => 
          keyword.includes(lowercaseQuery) || lowercaseQuery.includes(keyword)
        );

        return titleMatch || descriptionMatch || categoryMatch || keywordMatch;
      });
    }
    
    // Paginate the filtered results
    const total = allProducts.length;
    const totalPages = Math.ceil(total / PRODUCTS_PER_PAGE);
    const paginatedProducts = allProducts.slice(skip, skip + PRODUCTS_PER_PAGE);
    
    return {
      products: paginatedProducts,
      total,
      currentPage: page,
      totalPages,
      searchQuery
    };
  } catch (error) {
    console.error('Error fetching shop products:', error);
    return {
      products: [],
      total: 0,
      currentPage: 1,
      totalPages: 0,
      searchQuery
    };
  }
}

interface ShopPageProps {
  searchParams: { page?: string; search?: string };
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const currentPage = Number(searchParams.page) || 1;
  const searchQuery = searchParams.search || '';
  
  const { products, total, totalPages } = await getShopProducts(currentPage, searchQuery);
  
  const isSearching = searchQuery.trim().length > 0;
  return (
    <main className="pb-20">
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <hr className="h-[1px] border-t-black/10 mb-5 sm:mb-6" />
        <BreadcrumbShop />
        <div className="flex md:space-x-5 items-start">
          <div className="hidden md:block min-w-[295px] max-w-[295px] border border-black/10 rounded-[20px] px-5 md:px-6 py-5 space-y-5 md:space-y-6">
            <div className="flex items-center justify-between">
              <span className="font-bold text-black text-xl">Filters</span>
              <FiSliders className="text-2xl text-black/40" />
            </div>
            <Filters />
          </div>
          <div className="flex flex-col w-full space-y-5">
            <div className="flex flex-col lg:flex-row lg:justify-between">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="font-bold text-2xl md:text-[32px]">
                    {isSearching ? `Kết quả tìm kiếm` : 'Sản phẩm'}
                  </h1>
                  {isSearching && (
                    <p className="text-sm text-gray-600 mt-1">
                      Tìm kiếm cho: "<span className="font-medium">{searchQuery}</span>"
                    </p>
                  )}
                </div>
                <MobileFilters />
              </div>
              <div className="flex flex-col sm:items-center sm:flex-row">
                <span className="text-sm md:text-base text-black/60 mr-3">
                  Showing {((currentPage - 1) * PRODUCTS_PER_PAGE) + 1}-{Math.min(currentPage * PRODUCTS_PER_PAGE, total)} of {total} Products
                </span>
                <div className="flex items-center">
                  Sort by:{" "}
                  <Select defaultValue="most-popular">
                    <SelectTrigger className="font-medium text-sm px-1.5 sm:text-base w-fit text-black bg-transparent shadow-none border-none">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="most-popular">Most Popular</SelectItem>
                      <SelectItem value="low-price">Low Price</SelectItem>
                      <SelectItem value="high-price">High Price</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <div className="w-full grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
              {products.map((product) => (
                <ProductCard key={product.id} data={product} />
              ))}
            </div>
            <hr className="border-t-black/10" />
            <ShopPagination currentPage={currentPage} totalPages={totalPages} />
          </div>
        </div>
      </div>
    </main>
  );
}
