import {
  newArrivalsData,
  relatedProductData,
  topSellingData,
} from "@/app/page";
import ProductListSec from "@/components/common/ProductListSec";
import BreadcrumbProduct from "@/components/product-page/BreadcrumbProduct";
import Header from "@/components/product-page/Header";
import Tabs from "@/components/product-page/Tabs";
import { Product } from "@/types/product.types";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
export async function generateStaticParams() {
  const products = [
    ...newArrivalsData,
    ...topSellingData,
    ...relatedProductData,
  ];

  return products.map((p) => ({
    slug: [String(p.id), p.title.split(" ").join("-")],
  }));
}


export const revalidate = 86400; // ISR for product pages

const data: Product[] = [
  ...newArrivalsData,
  ...topSellingData,
  ...relatedProductData,
];

export async function generateMetadata({ params }: { params: { slug: string[] } }) {
  const productId = Number(params.slug?.[0]);
  const productData = data.find((p) => p.id === productId);

  if (!productData) return {};

  const title = `${productData.title}`;
  const description = `Mua ${productData.title} giá tốt tại Shopco. Đánh giá ${productData.rating}/5.`;
  const canonical = `/shop/product/${productData.id}/${productData.title.split(" ").join("-")}`;
  const images = [productData.srcUrl, ...(productData.gallery || [])];

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      images: images.map((url) => ({ url })),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images,
    },
  };
}

export default function ProductPage({
  params,
}: {
  params: { slug: string[] };
}) {
  const productData = data.find(
    (product) => product.id === Number(params.slug[0])
  );

  if (!productData?.title) {
    notFound();
  }

  return (
    <main>
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <hr className="h-[1px] border-t-black/10 mb-5 sm:mb-6" />
        <BreadcrumbProduct title={productData?.title ?? "product"} />
        <section className="mb-11">
          <Header data={productData} />
        </section>
        <Tabs />
        {/* JSON-LD Product + Breadcrumb */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              name: productData?.title,
              image: [productData?.srcUrl, ...(productData?.gallery || [])],
              description:
                "Sản phẩm thời trang chất lượng cao từ Shopco. Mua ngay với giá tốt.",
              offers: {
                "@type": "Offer",
                priceCurrency: "USD",
                price: productData?.discount?.percentage
                  ? Math.round(
                      productData.price -
                        (productData.price * productData.discount.percentage) / 100
                    )
                  : productData?.discount?.amount
                  ? productData.price - productData.discount.amount
                  : productData?.price,
                availability: "https://schema.org/InStock",
                url: `${require("@/lib/site").getSiteUrl()}/shop/product/${productData?.id}/${productData?.title
                  .split(" ")
                  .join("-")}`,
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: productData?.rating?.toFixed(1),
                reviewCount: 100,
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: `${require("@/lib/site").getSiteUrl()}/`,
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Shop",
                  item: `${require("@/lib/site").getSiteUrl()}/shop`,
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: productData?.title,
                  item: `${require("@/lib/site").getSiteUrl()}/shop/product/${productData?.id}/${productData?.title
                    .split(" ")
                    .join("-")}`,
                },
              ],
            }),
          }}
        />
      </div>
      <div className="mb-[50px] sm:mb-20">
        <ProductListSec title="You might also like" data={relatedProductData} />
      </div>
    </main>
  );
}
