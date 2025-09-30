import { cn } from "@/lib/utils";
import "@/styles/hotline-animate.css";
import { playfairDisplay } from "@/styles/fonts";
import Link from "next/link";
import React from "react";
import { NavMenu } from "../navbar.types";
import { MenuList } from "./MenuList";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { MenuItem } from "./MenuItem";
import Image from "next/image";
import InputGroup from "@/components/ui/input-group";
import ResTopNavbar from "./ResTopNavbar";
import CartBtn from "./CartBtn";
import { Button } from "@/components/ui/button";
import SearchInput from "./SearchInput";

const data: NavMenu = [
  {
    id: 1,
    label: "Phụ kiện trang trí",
    type: "MenuList",
    children: [
      {
        id: 1,
        label: "Tranh đính đá",
        url: "/shop#tranh-dinh-da",
        description: "Tranh đính đá nghệ thuật, đa dạng chủ đề, sang trọng",
      },
      {
        id: 2,
        label: "Tranh sơn mài",
        url: "/shop#tranh-son-mai",
        description: "Tranh sơn mài truyền thống, tinh xảo, đậm chất Việt",
      },
      {
        id: 3,
        label: "Tranh khánh vàng",
        url: "/shop#tranh-khanh-vang",
        description: "Tranh khánh vàng mạ vàng, quà tặng cao cấp, ý nghĩa",
      },
    ],
  },
  {
    id: 2,
    type: "MenuList",
    label: "Gạch ốp lát",
    url: "/shop#new-arrivals",
    children: [
      {
        id: 11,
        label: "Gạch Ấn Độ",
        url: "/shop#gach-an-do",
        description: "Gạch nhập khẩu Ấn Độ, chất lượng cao, mẫu mã đa dạng",
      },
      {
        id: 12,
        label: "Gạch 30x60",
        url: "/shop#gach-30x60",
        description: "Gạch lát nền, ốp tường phổ biến cho nhà ở, văn phòng",
      },
      {
        id: 13,
        label: "Gạch 20x120",
        url: "/shop#gach-20x120",
        description: "Gạch vân gỗ, phù hợp lát sàn phòng khách, phòng ngủ",
      },
      {
        id: 14,
        label: "Gạch 60x60",
        url: "/shop#gach-60x60",
        description: "Gạch lát nền cao cấp, phù hợp không gian rộng",
      },
      {
        id: 15,
        label: "Gạch 80x80",
        url: "/shop#gach-80x80",
        description: "Gạch lát nền kích thước lớn, sang trọng cho biệt thự, sảnh lớn",
      },
      {
        id: 16,
        label: "Gạch 40x40",
        url: "/shop#gach-40x40",
        description: "Gạch lát sân vườn, ban công, khu vực ngoài trời",
      },
      {
        id: 17,
        label: "Gạch 50x50",
        url: "/shop#gach-50x50",
        description: "Gạch lát nền đa năng cho nhiều không gian khác nhau",
      },
      {
        id: 18,
        label: "Gạch 25x40",
        url: "/shop#gach-25x40",
        description: "Gạch ốp tường nhà tắm, nhà vệ sinh phổ biến",
      },
    ],
  },
  {
    id: 3,
    type: "MenuList",
    label: "Thiết bị vệ sinh",
    url: "/shop#brands",
    children: [
      {
        id: 1,
        label: "Lavabo",
        url: "/shop#lavabo",
        description: "Chậu rửa mặt các loại, đa dạng mẫu mã, chất liệu",
      },
      {
        id: 2,
        label: "Tủ lavabo",
        url: "/shop#tu-lavabo",
        description: "Tủ lavabo hiện đại, tiện nghi cho phòng tắm",
      },
      {
        id: 3,
        label: "Vòi sen",
        url: "/shop#voi-sen",
        description: "Vòi sen tắm, sen cây, sen tắm nóng lạnh",
      },
      {
        id: 4,
        label: "Bồn cầu",
        url: "/shop#bon-cau",
        description: "Bồn cầu 1 khối, 2 khối, thông minh, tiết kiệm nước",
      },
      {
        id: 5,
        label: "Vòi nước",
        url: "/shop#voi-nuoc",
        description: "Vòi lavabo, vòi bếp, vòi rửa chén, vòi gắn tường",
      },
      {
        id: 6,
        label: "Gương phòng tắm",
        url: "/shop#guong-phong-tam",
        description: "Gương treo tường, gương đèn LED, gương nghệ thuật",
      },
      {
        id: 7,
        label: "Phụ kiện phòng tắm",
        url: "/shop#phu-kien-phong-tam",
        description: "Kệ, móc treo, hộp giấy, lô giấy, v.v.",
      },
    ],
  },
  {
    id: 4,
    type: "MenuList",
    label: "Đèn trang trí",
    url: "/shop#brands",
    children: [
      {
        id: 1,
        label: "Đèn bàn",
        url: "/shop#den-ban",
        description: "Đèn bàn trang trí, đèn bàn học, đèn bàn làm việc",
      },
      {
        id: 2,
        label: "Đèn cây",
        url: "/shop#den-cay",
        description: "Đèn cây đứng phòng khách, phòng ngủ, decor không gian",
      },
      {
        id: 3,
        label: "Đèn quạt trần",
        url: "/shop#den-quat-tran",
        description: "Đèn kết hợp quạt trần, tiết kiệm không gian, đa năng",
      },
      {
        id: 4,
        label: "Đèn thả trần",
        url: "/shop#den-tha-tran",
        description: "Đèn thả trần trang trí phòng khách, phòng ăn, quán cafe",
      },
      {
        id: 5,
        label: "Đèn tường",
        url: "/shop#den-tuong",
        description: "Đèn gắn tường, đèn hắt tường, chiếu sáng và trang trí",
      },
      {
        id: 6,
        label: "Đèn led dây",
        url: "/shop#den-led-day",
        description: "Đèn led dây trang trí nội thất, ngoại thất, ban công",
      },
      {
        id: 7,
        label: "Đèn âm trần",
        url: "/shop#den-am-tran",
        description: "Đèn led âm trần, chiếu sáng hiện đại, tiết kiệm điện",
      },
      {
        id: 8,
        label: "Đèn ngủ",
        url: "/shop#den-ngu",
        description: "Đèn ngủ để bàn, đèn ngủ treo tường, đèn ngủ cảm ứng",
      },
    ],
  },
  {
    id: 5,
    type: "MenuItem",
  label: "🔥 Flash sale",
    url: "/shop#on-sale",
    children: [],
  },
];

const TopNavbar = () => {
  return (
    <nav className="sticky top-0 bg-white z-20">
      <div className="flex relative max-w-frame mx-auto items-center justify-between md:justify-start py-5 md:py-6 px-4 xl:px-0">
        <div className="flex items-center">
          <div className="block md:hidden mr-4">
            <ResTopNavbar data={data} />
          </div>
          <Link
            href="/"
            className={cn([
              playfairDisplay.className,
              "text-2xl lg:text-[32px] mb-2 mr-3 lg:mr-10 font-bold",
            ])}
          >
            TPHOME
          </Link>
        </div>
        <NavigationMenu className="hidden md:flex mr-2 lg:mr-7">
          <NavigationMenuList>
            {data.map((item) => (
              <React.Fragment key={item.id}>
                {item.type === "MenuItem" && (
                  <MenuItem label={item.label} url={item.url} />
                )}
                {item.type === "MenuList" && (
                  <MenuList data={item.children} label={item.label} />
                )}
              </React.Fragment>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <div className="hidden lg:flex mr-3 lg:mr-10">
          <SearchInput />
        </div>
        <div className="flex items-center">
          <Button className="hotline-animate font-lato font-medium">
            <a href="tel:0779890789">📞 0779 89 0789</a>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
