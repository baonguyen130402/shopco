import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import React from "react";
import { PaymentBadge, SocialNetworks } from "./footer.types";
import { FaFacebookF, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import Link from "next/link";
import LinksSection from "./LinksSection";
import Image from "next/image";
import NewsLetterSection from "./NewsLetterSection";
import LayoutSpacing from "./LayoutSpacing";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

const socialsData: SocialNetworks[] = [
  {
    id: 1,
    icon: <FaTwitter />,
    url: "https://twitter.com",
  },
  {
    id: 2,
    icon: <FaFacebookF />,
    url: "https://facebook.com",
  },
  {
    id: 3,
    icon: <FaInstagram />,
    url: "https://instagram.com",
  },
];

const paymentBadgesData: PaymentBadge[] = [
  {
    id: 1,
    srcUrl: "/icons/Visa.svg",
  },
  {
    id: 2,
    srcUrl: "/icons/mastercard.svg",
  },
  {
    id: 3,
    srcUrl: "/icons/paypal.svg",
  },
  {
    id: 4,
    srcUrl: "/icons/applePay.svg",
  },
  {
    id: 5,
    srcUrl: "/icons/googlePay.svg",
  },
];

const Footer = () => {
  return (
    <footer className="mt-10">
      <div className="relative">
        <div className="absolute bottom-0 w-full h-1/2 bg-[#F0F0F0]"></div>
        <div className="px-4">
          <NewsLetterSection />
        </div>
      </div>
      <div className="pt-8 md:pt-[50px] bg-[#F0F0F0] px-4 pb-4">
        <div className="max-w-frame mx-auto">
          <nav className="lg:grid lg:grid-cols-12 mb-8">
            <div className="flex flex-col lg:col-span-4 lg:max-w-[340px]">
              <h1
                className={cn([
                  integralCF.className,
                  "text-[28px] lg:text-[32px] mb-4",
                ])}
              >
                TPHOME
              </h1>
              <div className="space-y-2 mb-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <span className="font-medium text-black">Địa chỉ: </span>
                    <span className=" text-black/60">42 QL1A, Xã Trung Hoà, Huyện Trảng Bom, Tỉnh Đồng Nai</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <div className="text-sm">
                    <span className="font-medium text-black">Hotline: </span>
                    <a href="tel:0779890789" className="text-black/60 hover:text-red-500 transition-colors">
                      0779 89 0789
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Clock className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <div className="text-sm">
                    <span className="font-medium text-black">Giờ mở cửa: </span>
                    <span className="text-black/60">7:30 - 21:00 (Thứ 2 - Chủ nhật)</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <div className="text-sm">
                    <span className="font-medium text-black">Email: </span>
                    <a href="mailto:phatnguyen.tphome@gmail.com" className="text-black/60 hover:text-red-500 transition-colors">
                      phatnguyen.tphome@gmail.com
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                {socialsData.map((social) => (
                  <Link
                    title={social.url}
                    href={social.url}
                    key={social.id}
                    className="bg-white hover:bg-black hover:text-white transition-all mr-3 w-7 h-7 rounded-full border border-black/20 flex items-center justify-center p-1.5"
                  >
                    {social.icon}
                  </Link>
                ))}
              </div>
            </div>
            <div className="hidden lg:grid col-span-8 lg:grid-cols-4 lg:pl-10">
              <LinksSection />
            </div>
            <div className="grid lg:hidden grid-cols-2 sm:grid-cols-4">
              <LinksSection />
            </div>
          </nav>

          <hr className="h-[1px] border-t-black/10 mb-6" />
          <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center mb-2">
            <p className="text-sm text-center sm:text-left text-black/60 mb-4 sm:mb-0 sm:mr-1">
              TPHome © Made by{" "}
              <Link
                href="https://github.com/BATI-TEAM"
                className="text-black font-medium"
              >
                BATI Team
              </Link>
              {", "}
              Designed by{" "}
              <Link
                href="https://www.figma.com/@hamzauix"
                className="text-black font-medium"
              >
                Bảo Nguyễn
              </Link>
            </p>
            <div className="flex items-center">
              {paymentBadgesData.map((badge, _, arr) => (
                <span
                  key={badge.id}
                  className={cn([
                    arr.length !== badge.id && "mr-3",
                    "w-[46px] h-[30px] rounded-[5px] border-[#D6DCE5] bg-white flex items-center justify-center",
                  ])}
                >
                  <Image
                    priority
                    src={badge.srcUrl}
                    width={33}
                    height={100}
                    alt="user"
                    className="max-h-[15px]"
                  />
                </span>
              ))}
            </div>
          </div>
        </div>
        <LayoutSpacing />
      </div>
    </footer>
  );
};

export default Footer;
