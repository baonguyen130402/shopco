"use client";

import React, { useState, useEffect } from 'react';
import { X, Gift, Percent, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const PromoBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check the last time user saw the banner
    const lastSeenTime = localStorage.getItem('tphome-promo-banner-last-seen');
    const currentTime = Date.now();
    const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds
    
    if (!lastSeenTime) {
      // First time visitor - show banner
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      // Check if it's been more than 1 hour since last seen
      const timeDifference = currentTime - parseInt(lastSeenTime);
      
      if (timeDifference >= oneHour) {
        // More than 1 hour has passed - show banner
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 1500);
        return () => clearTimeout(timer);
      }
      // Less than 1 hour - don't show banner
    }
  }, []);

  const closeBanner = () => {
    setIsVisible(false);
    // Save the current timestamp when banner is closed
    localStorage.setItem('tphome-promo-banner-last-seen', Date.now().toString());
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 animate-fade-in"
        onClick={closeBanner}
      />
      
      {/* Banner Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-md w-full mx-auto shadow-2xl animate-slide-up overflow-hidden relative">

          {/* Header with Background */}
          <div className="bg-gradient-to-r from-red-500 to-pink-500 p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 opacity-20">
              <Gift className="w-24 h-24" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center mb-2">
                <Percent className="w-6 h-6 mr-2" />
                <span className="text-sm font-medium uppercase tracking-wide">Khuyến Mãi Đặc Biệt</span>
              </div>
              <h2 className="text-2xl font-bold mb-1">GIẢM GIÁ ĐẾN 50%</h2>
              <p className="text-red-100 text-sm">Cho tất cả sản phẩm gạch ốp lát & thiết bị vệ sinh</p>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="space-y-4">
              {/* Offer Details */}
              <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                <div className="flex items-start space-x-3">
                  <div className="bg-orange-500 rounded-full p-2 flex-shrink-0">
                    <Gift className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Ưu đãi hấp dẫn:</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Giảm 50% gạch trang trí cao cấp</li>
                      <li>• Giảm 30% thiết bị vệ sinh</li>
                      <li>• Miễn phí vận chuyển đơn từ 2 triệu</li>
                      <li>• Tặng phụ kiện lắp đặt</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Countdown Timer */}
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Clock className="w-5 h-5 text-red-500 mr-2" />
                  <span className="text-sm font-medium text-gray-700">Thời gian có hạn</span>
                </div>
                <div className="text-2xl font-bold text-red-500">
                  Kết thúc 31/12/2024
                </div>
                <p className="text-xs text-gray-500 mt-1">Số lượng có hạn - Nhanh tay đặt hàng!</p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button 
                  onClick={closeBanner}
                  className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold py-3 rounded-lg"
                >
                  Mua Ngay - Tiết Kiệm 50%
                </Button>
                <button
                  onClick={closeBanner}
                  className="w-full text-gray-500 text-sm hover:text-gray-700 transition-colors"
                >
                  Để sau, tôi sẽ xem
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.4s ease-out;
        }
      `}</style>
    </>
  );
};

export default PromoBanner;
