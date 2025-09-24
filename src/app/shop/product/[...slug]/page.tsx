import ProductListSec from "@/components/common/ProductListSec";
import BreadcrumbProduct from "@/components/product-page/BreadcrumbProduct";
import Header from "@/components/product-page/Header";
import Tabs from "@/components/product-page/Tabs";
import { Product } from "@/types/product.types";
import { notFound } from "next/navigation";
import { DummyJsonApi } from "@/services/dummyJsonApi";
import { transformDummyProductToProduct, transformDummyProductsToProducts } from "@/utils/productTransformer";

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

  return (
    <main>
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
