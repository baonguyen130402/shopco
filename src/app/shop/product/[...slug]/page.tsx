import ProductListSec from "@/components/common/ProductListSec";
import BreadcrumbProduct from "@/components/product-page/BreadcrumbProduct";
import Header from "@/components/product-page/Header";
import Tabs from "@/components/product-page/Tabs";
import { Product } from "@/types/product.types";
import { notFound } from "next/navigation";
import { DummyJsonApi } from "@/services/dummyJsonApi";
import { transformDummyProductToProduct, transformDummyProductsToProducts } from "@/utils/productTransformer";
import { Metadata } from "next";
import StructuredData from "@/components/seo/StructuredData";

async function getProductData(id: number): Promise<Product | null> {
  try {
    const dummyProduct = await DummyJsonApi.getProductById(id);
    return transformDummyProductToProduct(dummyProduct);
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

async function getRelatedProducts(limit = 4): Promise<Product[]> {
  try {
    const response = await DummyJsonApi.getAllProducts(limit);
    return transformDummyProductsToProducts(response.products);
  } catch (error) {
    console.error('Error fetching related products:', error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}): Promise<Metadata> {
  const productId = Number(params.slug[0]);
  
  if (isNaN(productId)) {
    return {
      title: "Sản phẩm không tìm thấy - TPHOME",
      description: "Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.",
      robots: { index: false, follow: false },
    };
  }

  const product = await getProductData(productId);
  
  if (!product) {
    return {
      title: "Sản phẩm không tìm thấy - TPHOME",
      description: "Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.",
      robots: { index: false, follow: false },
    };
  }

  const title = `${product.title} - TPHOME`;
  const description = `${product.description} Mua ngay với giá ${product.price.toLocaleString('vi-VN')}₫. Miễn phí vận chuyển, bảo hành chính hãng tại TPHOME.`;
  
  // Generate keywords based on product data
  const productKeywords = [
    product.title.toLowerCase(),
    product.category?.toLowerCase(),
    product.brand?.toLowerCase(),
    "mua online",
    "giá tốt",
    "chất lượng cao",
    "TPHOME",
    "giao hàng nhanh",
    "bảo hành"
  ].filter(Boolean);

  return {
    title,
    description,
    keywords: productKeywords,
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
      url: `https://tphome.vn/shop/product/${params.slug.join('/')}`,
      siteName: "TPHOME",
      title,
      description,
      images: [
        {
          url: product.thumbnail || "/images/product-placeholder.jpg",
          width: 800,
          height: 600,
          alt: product.title,
        },
        ...(product.images?.slice(0, 3).map(img => ({
          url: img,
          width: 800,
          height: 600,
          alt: product.title,
        })) || [])
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [product.thumbnail || "/images/product-placeholder.jpg"],
    },
    alternates: {
      canonical: `https://tphome.vn/shop/product/${params.slug.join('/')}`,
    },
    other: {
      "product:price:amount": product.price.toString(),
      "product:price:currency": "VND",
      "product:availability": product.stock > 0 ? "in stock" : "out of stock",
      "product:category": product.category || "",
      "product:brand": product.brand || "TPHOME",
    },
    category: "Product",
  };
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string[] };
}) {
  const productId = Number(params.slug[0]);
  
  if (isNaN(productId)) {
    notFound();
  }

  const [productData, relatedProducts] = await Promise.all([
    getProductData(productId),
    getRelatedProducts()
  ]);

  if (!productData?.title) {
    notFound();
  }

  // Generate product structured data
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: productData.title,
    description: productData.description,
    image: [
      productData.thumbnail || "/images/product-placeholder.jpg",
      ...(productData.images || [])
    ],
    brand: {
      "@type": "Brand",
      name: productData.brand || "TPHOME"
    },
    offers: {
      "@type": "Offer",
      url: `https://tphome.vn/shop/product/${params.slug.join('/')}`,
      priceCurrency: "VND",
      price: productData.price.toString(),
      availability: productData.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "TPHOME"
      }
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: productData.rating?.toString() || "5",
      reviewCount: "1"
    }
  };

  return (
    <main>
      <StructuredData type="product" data={productSchema} />
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <hr className="h-[1px] border-t-black/10 mb-5 sm:mb-6" />
        <BreadcrumbProduct title={productData?.title ?? "product"} />
        <section className="mb-11">
          <Header data={productData} />
        </section>
        <Tabs />
      </div>
      <div className="mb-[50px] sm:mb-20">
        <ProductListSec title="You might also like" data={relatedProducts} />
      </div>
    </main>
  );
}
