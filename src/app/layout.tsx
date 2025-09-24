import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { playfairDisplay, lato } from "@/styles/fonts";
import TopBanner from "@/components/layout/Banner/TopBanner";
import TopNavbar from "@/components/layout/Navbar/TopNavbar";
import Footer from "@/components/layout/Footer";
import HolyLoader from "holy-loader";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "TPHOME - Gạch Ốp Lát & Đồ Nội Thất Cao Cấp",
  description: "Chuyên cung cấp gạch ốp lát, gạch trang trí, thiết bị vệ sinh và đồ nội thất cao cấp. Uy tín - Chất lượng - Giá tốt nhất thị trường.",
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${playfairDisplay.variable} ${lato.variable} ${lato.className} antialiased`}>
        <HolyLoader color="#868686" />
        <TopBanner />
        <Providers>
          <TopNavbar />
          {children}
        </Providers>
        <Footer />
      </body>
    </html>
  );
}
