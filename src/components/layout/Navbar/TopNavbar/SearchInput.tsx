"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { DummyJsonApi } from '@/services/dummyJsonApi';
import { transformDummyProductsToProducts } from '@/utils/productTransformer';
import { Product } from '@/types/product.types';
import { generateProductUrl } from '@/utils/productSlugUtils';
import InputGroup from '@/components/ui/input-group';
import { X } from 'lucide-react';

const SearchInput = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Load all products and sync with URL params on component mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await DummyJsonApi.getAllProducts(100); // Load more products for search
        const products = transformDummyProductsToProducts(response.products);
        setAllProducts(products);
      } catch (error) {
        console.error('Error loading products for search:', error);
      }
    };
    loadProducts();

    // Sync search query with URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const urlSearchQuery = urlParams.get('search');
    if (urlSearchQuery) {
      setSearchQuery(urlSearchQuery);
    }
  }, []);

  // Handle search
  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    setIsLoading(true);
    
    // Debounce search
    const timeoutId = setTimeout(() => {
      searchProducts(searchQuery);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, allProducts]);

  const searchProducts = (query: string) => {
    const lowercaseQuery = query.toLowerCase();
    
    const filtered = allProducts.filter(product => {
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

    setSearchResults(filtered.slice(0, 8)); // Limit to 8 results
    setShowResults(filtered.length > 0);
    setIsLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    // If user clears the search input, handle the clear action
    if (value === '') {
      handleClearSearch();
    }
  };

  const handleResultClick = () => {
    setShowResults(false);
    setSearchQuery('');
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setShowResults(false);
    
    // If we're on the shop page with search params, go back to shop without search
    if (window.location.pathname === '/shop' && window.location.search.includes('search=')) {
      router.push('/shop');
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to shop page with search query
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowResults(false);
    }
  };

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={searchRef} className="relative">
      <form onSubmit={handleSearchSubmit}>
        <InputGroup className="bg-[#F0F0F0]">
          <InputGroup.Text>
            <Image
              priority
              src="/icons/search.svg"
              height={20}
              width={20}
              alt="search"
              className="min-w-5 min-h-5"
            />
          </InputGroup.Text>
          <InputGroup.Input
            type="text"
            name="search"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder="Tìm kiếm sản phẩm..."
            className="bg-transparent placeholder:text-black/40 font-lato pr-8"
            autoComplete="off"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </InputGroup>
      </form>

      {/* Search Results Dropdown */}
      {showResults && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-black mx-auto"></div>
              <p className="mt-2 text-sm text-gray-500">Đang tìm kiếm...</p>
            </div>
          ) : searchResults.length > 0 ? (
            <>
              <div className="p-3 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-700">
                  Tìm thấy {searchResults.length} sản phẩm cho "{searchQuery}"
                </p>
              </div>
              <div className="py-2">
                {searchResults.map((product) => {
                  const productUrl = generateProductUrl(product.category || 'san-pham-khac', product.title, product.id);
                  return (
                    <Link
                      key={product.id}
                      href={productUrl}
                      onClick={handleResultClick}
                      className="flex items-center p-3 hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 mr-3">
                        <Image
                          src={product.srcUrl}
                          alt={product.title}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 truncate">
                          {product.title}
                        </h4>
                        <p className="text-sm text-gray-500 truncate">
                          {product.category}
                        </p>
                        <p className="text-sm font-semibold text-red-600">
                          {product.price.toLocaleString('vi-VN')}đ
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
              <div className="p-3 border-t border-gray-100">
                <button
                  onClick={() => {
                    router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
                    setShowResults(false);
                  }}
                  className="w-full text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Xem tất cả kết quả tìm kiếm →
                </button>
              </div>
            </>
          ) : (
            <div className="p-4 text-center">
              <p className="text-sm text-gray-500">
                Không tìm thấy sản phẩm nào cho "{searchQuery}"
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Thử tìm kiếm với từ khóa khác
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
