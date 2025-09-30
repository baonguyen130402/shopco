import React from "react";
import Rating from "../ui/Rating";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product.types";
import { generateProductUrl } from "@/utils/productSlugUtils";
import "./ProductCard.css"; // Import CSS file riêng

type ProductCardProps = {
  data: Product;
};

const ProductCard = ({ data }: ProductCardProps) => {
  const productUrl = generateProductUrl(data.category || 'san-pham-khac', data.title, data.id);
  
  const hasDiscount = data.discount.percentage > 0 || data.discount.amount > 0;
  const finalPrice = data.discount.percentage > 0 
    ? Math.round(data.price - (data.price * data.discount.percentage) / 100)
    : data.discount.amount > 0 
    ? data.price - data.discount.amount
    : data.price;
  
  return (
    <Link
      title={data.title}
      href={productUrl}
      className="group flex flex-col items-start aspect-auto p-3 xl:p-4 rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-lg hover:border-gray-300 transition-all duration-300"
    >
      {/* Image Container với hiệu ứng nâng cao */}
      <div className="relative w-full lg:max-w-[295px] aspect-square mb-3 xl:mb-4 overflow-hidden rounded-2xl lg:rounded-3xl bg-gradient-to-br from-[#F5F3F0] to-[#E8E6E3] shadow-sm group-hover:shadow-xl transition-all duration-500">
        {/* Gradient Overlay khi hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-[1]" />
        
        {/* Image */}
        <Image
          title={data.title}
          src={data.srcUrl}
          width={295}
          height={298}
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 ease-out"
          alt={data.title}
          priority
        />
        
        {/* Sale Badge - Premium Design with Multiple Effects */}
        {hasDiscount && (
          <div className="absolute top-3 left-3 z-10">
            {/* Pulsing glow ring */}
            <div className="sale-badge-glow" />
            
            {/* Ripple effect */}
            <div className="sale-badge-ripple" />
            
            <div className="sale-badge-container">
              {/* Animated gradient background */}
              <div className="sale-badge-gradient" />
              
              {/* Elegant Shine effect */}
              <div className="sale-badge-shine" />
              
              {/* Sparkle particles */}
              <div className="sale-badge-sparkle sale-badge-sparkle-1" />
              <div className="sale-badge-sparkle sale-badge-sparkle-2" />
              <div className="sale-badge-sparkle sale-badge-sparkle-3" />
              
              <div className="relative z-10">
                {data.discount.percentage > 0 ? (
                  <>
                    <div className="sale-badge-text">
                      <span className="sale-badge-icon">🔥</span>
                      Giảm tới
                    </div>
                    <div className="sale-badge-value">
                      {data.discount.percentage}%
                    </div>
                  </>
                ) : (
                  <>
                    <div className="sale-badge-text">
                      <span className="sale-badge-icon">💥</span>
                      Giảm giá
                    </div>
                    <div className="sale-badge-value-small">
                      {data.discount.amount.toLocaleString('vi-VN')}đ
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
        
        {/* Quick View Button - Hiện khi hover */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-[2]">
          <button className="w-full bg-white/95 backdrop-blur-sm text-black font-semibold py-2.5 rounded-lg hover:bg-white transition-colors shadow-lg">
            Xem nhanh
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="w-full space-y-2">
        {/* Title */}
        <h3 className="text-black text-base xl:text-xl font-semibold font-lato line-clamp-2 group-hover:text-red-600 transition-colors duration-300">
          {data.title}
        </h3>
        
        {/* Quality Badge */}
        <div className="flex items-center">
          <span className="text-xs xl:text-sm text-black/60 font-lato flex items-center gap-1.5">
            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Sản phẩm chất lượng cao
          </span>
        </div>
        
        {/* Price Section */}
        <div className="flex items-center gap-2 flex-wrap pt-1">
          {/* Current Price */}
          <span className="font-bold text-black text-xl xl:text-2xl font-lato">
            {finalPrice.toLocaleString('vi-VN')}đ
          </span>
          
          {/* Original Price (if discounted) */}
          {hasDiscount && (
            <span className="font-medium text-black/40 line-through text-base xl:text-lg font-lato">
              {data.price.toLocaleString('vi-VN')}đ
            </span>
          )}
          
          {/* Discount Badge */}
          {data.discount.percentage > 0 && (
            <span className="inline-flex items-center font-semibold text-[10px] xl:text-xs px-2.5 py-1 rounded-full bg-gradient-to-r from-red-50 to-red-100 text-red-600 border border-red-200">
              -{data.discount.percentage}%
            </span>
          )}
          
          {data.discount.amount > 0 && data.discount.percentage === 0 && (
            <span className="inline-flex items-center font-semibold text-[10px] xl:text-xs px-2.5 py-1 rounded-full bg-gradient-to-r from-red-50 to-red-100 text-red-600 border border-red-200">
              -{data.discount.amount.toLocaleString('vi-VN')}đ
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;