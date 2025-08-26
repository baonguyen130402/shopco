import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { satoshi } from "@/styles/fonts";
import TopBanner from "@/components/layout/Banner/TopBanner";
import TopNavbar from "@/components/layout/Navbar/TopNavbar";
import Footer from "@/components/layout/Footer";
import HolyLoader from "holy-loader";
import Providers from "./providers";
import OrganizationJsonLd from "./(seo)/organization-jsonld";

export { default as metadata } from "./metadata";

// Note: The following object is kept to avoid losing granular settings; merged into app/metadata via tooling if needed.
/* export const metadata__keep: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "Shopco",
    template: "%s | Shopco",
  },
  description:
    "Shopco - Cửa hàng thời trang hiện đại, tối ưu hiệu năng và trải nghiệm người dùng.",
  applicationName: "Shopco",
  openGraph: {
    type: "website",
    siteName: "Shopco",
    title: "Shopco",
    description:
      "Shopco - Cửa hàng thời trang hiện đại, tối ưu hiệu năng và trải nghiệm người dùng.",
    url: "/",
    images: [
      {
        url: "/images/header-homepage.png",
        width: 1200,
        height: 630,
        alt: "Shopco",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shopco",
    description:
      "Shopco - Cửa hàng thời trang hiện đại, tối ưu hiệu năng và trải nghiệm người dùng.",
    images: ["/images/header-homepage.png"],
  },
}; */

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={satoshi.className}>
        <HolyLoader color="#868686" />
        <TopBanner />
        <Providers>
          <TopNavbar />
          {children}
        </Providers>
        <Footer />
        <OrganizationJsonLd />
      </body>
    </html>
  );
}
