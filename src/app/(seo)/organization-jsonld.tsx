export default function OrganizationJsonLd() {
  const base = require("@/lib/site").getSiteUrl();
  const json = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Shopco",
    url: base,
    logo: `${base}/icons/big-star.svg`,
    sameAs: [
      "https://twitter.com",
      "https://facebook.com",
      "https://instagram.com",
      "https://github.com/mohammadoftadeh",
    ],
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />
  );
}
