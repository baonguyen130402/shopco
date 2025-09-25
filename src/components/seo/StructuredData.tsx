import Script from 'next/script';

interface OrganizationSchema {
  "@context": "https://schema.org";
  "@type": "Organization";
  name: string;
  url: string;
  logo: string;
  description: string;
  telephone?: string;
  email?: string;
  address?: {
    "@type": "PostalAddress";
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  sameAs?: string[];
}

interface ProductSchema {
  "@context": "https://schema.org";
  "@type": "Product";
  name: string;
  description: string;
  image: string[];
  brand: {
    "@type": "Brand";
    name: string;
  };
  offers: {
    "@type": "Offer";
    url: string;
    priceCurrency: string;
    price: string;
    availability: string;
    seller: {
      "@type": "Organization";
      name: string;
    };
  };
  aggregateRating?: {
    "@type": "AggregateRating";
    ratingValue: string;
    reviewCount: string;
  };
}

interface BlogSchema {
  "@context": "https://schema.org";
  "@type": "BlogPosting";
  headline: string;
  description: string;
  author: {
    "@type": "Person";
    name: string;
  };
  publisher: {
    "@type": "Organization";
    name: string;
    logo: {
      "@type": "ImageObject";
      url: string;
    };
  };
  datePublished: string;
  dateModified: string;
  mainEntityOfPage: {
    "@type": "WebPage";
    "@id": string;
  };
}

interface StructuredDataProps {
  type: 'organization' | 'product' | 'blog';
  data: OrganizationSchema | ProductSchema | BlogSchema;
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const jsonLd = JSON.stringify(data);

  return (
    <Script
      id={`structured-data-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLd }}
    />
  );
}

// Predefined organization schema for TPHOME
export const TPHOMEOrganizationSchema: OrganizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "TPHOME",
  url: "https://tphome.vn",
  logo: "https://tphome.vn/images/logo.png",
  description: "Chuyên cung cấp gạch ốp lát, gạch trang trí, thiết bị vệ sinh và đồ nội thất cao cấp. Uy tín - Chất lượng - Giá tốt nhất thị trường.",
  telephone: "+84-xxx-xxx-xxx",
  email: "info@tphome.vn",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Địa chỉ cửa hàng",
    addressLocality: "TP. Hồ Chí Minh",
    addressRegion: "TP. Hồ Chí Minh",
    postalCode: "700000",
    addressCountry: "VN"
  },
  sameAs: [
    "https://facebook.com/tphome",
    "https://instagram.com/tphome",
    "https://youtube.com/tphome"
  ]
};