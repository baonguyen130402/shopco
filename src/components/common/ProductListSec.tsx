import React from "react";
import * as motion from "framer-motion/client";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import ProductCard from "./ProductCard";
import { Product } from "@/types/product.types";
import Link from "next/link";

import { ReactNode } from "react";
type ProductListSecProps = {
  title: ReactNode;
  data: Product[];
  viewAllLink?: string;
};

const ProductListSec = ({ title, data, viewAllLink }: ProductListSecProps) => {
  // Split data into two groups of 4 items each
  const firstGroup = data.slice(0, 4);
  const secondGroup = data.slice(4, 8);

  return (
    <section className="max-w-frame mx-auto text-center">
      <motion.h2
        initial={{ y: "100px", opacity: 0 }}
        animate={{ y: "0", opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={cn([
          integralCF.className,
          "text-[32px] md:text-5xl mb-8 md:mb-14 capitalize",
        ])}
      >
        {title}
      </motion.h2>
      <motion.div
        initial={{ y: "100px", opacity: 0 }}
        animate={{ y: "0", opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="space-y-8 md:space-y-12"
      >
        {/* First Carousel - Items 1-4 */}
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent className="mx-4 xl:mx-0 space-x-4 sm:space-x-5">
            {firstGroup.map((product) => (
              <CarouselItem
                key={product.id}
                className="w-full max-w-[198px] sm:max-w-[295px] pl-0"
              >
                <ProductCard data={product} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Second Carousel - Items 5-8 */}
        {secondGroup.length > 0 && (
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full mb-6 md:mb-9"
          >
            <CarouselContent className="mx-4 xl:mx-0 space-x-4 sm:space-x-5">
              {secondGroup.map((product) => (
                <CarouselItem
                  key={product.id}
                  className="w-full max-w-[198px] sm:max-w-[295px] pl-0"
                >
                  <ProductCard data={product} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        )}

        {viewAllLink && (
          <div className="w-full px-4 sm:px-0 text-center">
            <Link
              href={viewAllLink}
              className="w-full inline-block sm:w-[218px] px-[54px] py-4 border rounded-full hover:bg-black hover:text-white text-black transition-all font-medium text-sm sm:text-base border-black/10"
            >
              Xem tất cả
            </Link>
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default ProductListSec;
