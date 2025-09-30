import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { playfairDisplay, lato } from "@/styles/fonts";
import TopBanner from "@/components/layout/Banner/TopBanner";
import TopNavbar from "@/components/layout/Navbar/TopNavbar";
import Footer from "@/components/layout/Footer";
import HolyLoader from "holy-loader";
import Providers from "./providers";
import StructuredData, { TPHOMEOrganizationSchema } from "@/components/seo/StructuredData";
import PromoBanner from "@/components/layout/PromoBanner/PromoBanner";

export const metadata: Metadata = {
  title: "TPHOME - Gạch Ốp Lát & Đồ Nội Thất Cao Cấp",
  description: "Chuyên cung cấp gạch ốp lát, gạch trang trí, thiết bị vệ sinh và đồ nội thất cao cấp. Uy tín - Chất lượng - Giá tốt nhất thị trường.",
  icons: {
    icon: '/icons/tphome.ico',
    shortcut: '/icons/tphome.ico',
    apple: '/icons/tphome.ico',
  },
  keywords: [
    "gạch ốp lát",
    "gạch trang trí", 
    "thiết bị vệ sinh",
    "đồ nội thất",
    "gạch ceramic",
    "gạch granite",
    "gạch men",
    "lavabo",
    "bồn cầu",
    "vòi sen",
    "nội thất phòng tắm",
    "trang trí nội thất",
    "gạch cao cấp",
    "thiết bị vệ sinh cao cấp",
    "TPHOME"
  ],
  authors: [{ name: "TPHOME" }],
  creator: "TPHOME",
  publisher: "TPHOME",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://tphome.vn",
    siteName: "TPHOME",
    title: "TPHOME - Gạch Ốp Lát & Đồ Nội Thất Cao Cấp",
    description: "Chuyên cung cấp gạch ốp lát, gạch trang trí, thiết bị vệ sinh và đồ nội thất cao cấp. Uy tín - Chất lượng - Giá tốt nhất thị trường.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TPHOME - Gạch Ốp Lát & Đồ Nội Thất",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TPHOME - Gạch Ốp Lát & Đồ Nội Thất Cao Cấp",
    description: "Chuyên cung cấp gạch ốp lát, gạch trang trí, thiết bị vệ sinh và đồ nội thất cao cấp.",
    images: ["/images/og-image.jpg"],
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  alternates: {
    canonical: "https://tphome.vn",
  },
  category: "E-commerce",
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
        <StructuredData type="organization" data={TPHOMEOrganizationSchema} />
        <HolyLoader color="#868686" />
        <PromoBanner />
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
