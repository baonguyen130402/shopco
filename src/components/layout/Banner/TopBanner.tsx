import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const TopBanner = () => {
  return (
    <div className="bg-black text-white text-center py-2 px-2 sm:px-4 xl:px-0">
      <div className="relative max-w-frame mx-auto">
        <p className="text-xs sm:text-sm">
          Email: <a href="mailto:phatnguyen.tphome@gmail.com" className="underline font-medium">phatnguyen.tphome@gmail.com</a>
          {" | "}
          Hotline: <a href="tel:0779890789" className="underline font-medium">0779 89 07 89</a>
          {" | "}
          Giờ hoạt động: <span className="font-medium">07:30-21:00</span>
        </p>
      </div>
    </div>
  );
};

export default TopBanner;
