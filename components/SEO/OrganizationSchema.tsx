export default function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "GovernmentOrganization",
    name: "Government of Sierra Leone",
    url: "https://info.gov.sl",
    logo: "https://info.gov.sl/logo.png",
    image: "https://info.gov.sl/og-image.jpg",
    sameAs: [
      "https://www.facebook.com/",
      "https://x.com/"
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "SL"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}