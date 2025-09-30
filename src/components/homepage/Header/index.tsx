"use client";

import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { playfairDisplay } from "@/styles/fonts";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import * as motion from "framer-motion/client";

const Header = () => {
  return (
    <header className="bg-[#F2F0F1] pt-10 md:pt-24 overflow-hidden bg-[url('/images/banner-1.webp')] bg-cover bg-center bg-no-repeat">
      <style jsx>{`
        @keyframes elegantShine {
          0% { transform: translateX(-150%) translateY(-150%) rotate(45deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateX(150%) translateY(150%) rotate(45deg); opacity: 0; }
        }
        
        .blur-box {
          position: relative;
          overflow: hidden;
        }
        
        .blur-box::after {
          content: '';
          position: absolute;
          top: -100%;
          left: -100%;
          width: 300%;
          height: 300%;
          background: linear-gradient(
            45deg, 
            transparent 25%, 
            rgba(255, 255, 255, 0.3) 45%, 
            rgba(255, 255, 255, 0.5) 50%, 
            rgba(255, 255, 255, 0.3) 55%, 
            transparent 75%
          );
          animation: elegantShine 6s infinite;
          pointer-events: none;
        }
      `}</style>
      <div className="md:max-w-frame mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        <section className="max-w-frame px-4">
          <div className="blur-box bg-white/30 backdrop-blur-md rounded-3xl p-6 md:p-10 shadow-2xl border border-white/40">
            <motion.h2
              initial={{ y: "100px", opacity: 0, rotate: 10 }}
              whileInView={{ y: "0", opacity: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={cn([
                playfairDisplay.className,
                "text-3xl md:text-4xl lg:text-[52px] lg:leading-[72px] mb-5 lg:mb-8 font-bold",
              ])}
            >
              GẠCH ỐP LÁT & NỘI THẤT CAO CẤP
            </motion.h2>
            <motion.p
              initial={{ y: "100px", opacity: 0 }}
              whileInView={{ y: "0", opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-black/75 text-sm lg:text-base mb-6 lg:mb-8 max-w-[545px] font-lato"
            >
              Khám phá bộ sưu tập đa dạng gạch ốp lát, gạch trang trí và thiết bị nội thất 
              cao cấp. Chúng tôi mang đến cho bạn những sản phẩm chất lượng nhất để tạo nên 
              không gian sống hoàn hảo.
            </motion.p>
            <motion.div
              initial={{ y: "100px", opacity: 0 }}
              whileInView={{ y: "0", opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <Link
                href="/shop"
                className="w-full md:w-52 mb-[0.5rem] inline-block text-center bg-black hover:bg-black/80 transition-all text-white px-14 py-4 rounded-full hover:animate-pulse font-lato font-medium"
              >
                Mua Ngay
              </Link>
            </motion.div>
          </div>
          <motion.div
            initial={{ y: "100px", opacity: 0 }}
            whileInView={{ y: "0", opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="flex md:h-full md:max-h-11 lg:max-h-[52px] xl:max-h-[68px] items-center justify-center md:justify-start flex-wrap sm:flex-nowrap md:space-x-3 lg:space-x-6 xl:space-x-8 md:mb-[116px]"
          >
            {/* <div className="flex flex-col">
              <span className="font-bold text-2xl md:text-xl lg:text-3xl xl:text-[40px] xl:mb-2 font-lato">
                <AnimatedCounter from={0} to={500} />+
              </span>
              <span className="text-xs xl:text-base text-black/60 text-nowrap font-lato">
                Sản Phẩm Chất Lượng
              </span>
            </div>
            <Separator
              className="ml-6 md:ml-0 h-12 md:h-full bg-black/10"
              orientation="vertical"
            />
            <div className="flex flex-col ml-6 md:ml-0">
              <span className="font-bold text-2xl md:text-xl lg:text-3xl xl:text-[40px] xl:mb-2 font-lato">
                <AnimatedCounter from={0} to={50} />+
              </span>
              <span className="text-xs xl:text-base text-black/60 text-nowrap font-lato">
                Thương Hiệu Uy Tín
              </span>
            </div>
            <Separator
              className="hidden sm:block sm:h-12 md:h-full ml-6 md:ml-0 bg-black/10"
              orientation="vertical"
            />
            <div className="flex flex-col w-full text-center sm:w-auto sm:text-left mt-3 sm:mt-0 sm:ml-6 md:ml-0">
              <span className="font-bold text-2xl md:text-xl lg:text-3xl xl:text-[40px] xl:mb-2 font-lato">
                <AnimatedCounter from={0} to={1000} />+
              </span>
              <span className="text-xs xl:text-base text-black/60 text-nowrap font-lato">
                Khách Hàng Hài Lòng
              </span>
            </div> */}
          </motion.div>
        </section>
      </div>
    </header>
  );
};

export default Header;