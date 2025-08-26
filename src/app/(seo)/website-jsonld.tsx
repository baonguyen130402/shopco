import { getSiteUrl } from "@/lib/site";

export default function WebsiteJsonLd() {
  const base = getSiteUrl();
  const json = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Shopco",
    url: base,
    potentialAction: {
      "@type": "SearchAction",
      target: `${base}/shop?search={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />
  );
}
