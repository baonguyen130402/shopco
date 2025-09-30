import React from "react";
import { FooterLinks } from "./footer.types";
import Link from "next/link";
import { cn } from "@/lib/utils";
import MapSection from "./MapSection";

const footerLinksData: FooterLinks[] = [
  // {
  //   id: 1,
  //   title: "Công ty",
  //   children: [
  //     {
  //       id: 11,
  //       label: "Giới thiệu",
  //       url: "/about",
  //     },
  //     {
  //       id: 12,
  //       label: "Dự án tiêu biểu",
  //       url: "/projects",
  //     },
  //     {
  //       id: 13,
  //       label: "Đối tác",
  //       url: "/partners",
  //     },
  //     {
  //       id: 14,
  //       label: "Tuyển dụng",
  //       url: "/careers",
  //     },
  //   ],
  // },
  // {
  //   id: 2,
  //   title: "Hỗ trợ",
  //   children: [
  //     {
  //       id: 21,
  //       label: "Chăm sóc khách hàng",
  //       url: "/support",
  //     },
  //     {
  //       id: 22,
  //       label: "Hướng dẫn mua hàng",
  //       url: "/guide",
  //     },
  //     {
  //       id: 23,
  //       label: "Chính sách đổi trả",
  // FullWi      url: "/return-policy",
  //     },
  //     {
  //       id: 24,
  //       label: "Bảo hành sản phẩm",
  //       url: "/warranty",
  //     },
  //   ],
  // },
  // {
  //   id: 3,
  //   title: "Sản phẩm",
  //   children: [
  //     {
  //       id: 31,
  //       label: "Gạch ốp lát",
  //       url: "/gach-op-lat",
  //     },
  //     {
  //       id: 32,
  //       label: "Thiết bị vệ sinh",
  //       url: "/thiet-bi-ve-sinh",
  //     },
  //     {
  //       id: 33,
  //       label: "Đèn trang trí",
  //       url: "/den-trang-tri",
  //     },
  //     {
  //       id: 34,
  //       label: "Phụ kiện nội thất",
  //       url: "/phu-kien-noi-that",
  //     },
  //   ],
  // },
];

const LinksSection = () => {
  return (
    <>
      {/* Footer Links Sections */}
      {footerLinksData.map((item) => (
        <section className="flex flex-col mt-5" key={item.id}>
          <h3 className="font-medium text-sm md:text-base uppercase tracking-widest mb-6 text-black">
            {item.title}
          </h3>
          {item.children.map((link) => (
            <Link
              href={link.url}
              key={link.id}
              className="text-black/60 text-sm md:text-base mb-4 w-fit hover:text-red-500 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </section>
      ))}
      <MapSection />
      {/* Map Section */}
    </>
  );
};

export default LinksSection;
