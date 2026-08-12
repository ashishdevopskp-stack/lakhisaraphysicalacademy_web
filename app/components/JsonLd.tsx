import Script from "next/script";

export interface JsonLdProps {
  type?: "Organization" | "LocalBusiness" | "Course" | "FAQPage";
  data?: Record<string, any>;
}

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "SportsActivityLocation", "LocalBusiness"],
    "name": "Lakhisarai Physical Academy",
    "alternateName": "लखीसराय फिजिकल एकेडमी",
    "url": process.env.NEXT_PUBLIC_SITE_URL || "https://lakhisaraphysicalacademy.com",
    "logo": `${process.env.NEXT_PUBLIC_SITE_URL || "https://lakhisaraphysicalacademy.com"}/logo.png`,
    "image": `${process.env.NEXT_PUBLIC_SITE_URL || "https://lakhisaraphysicalacademy.com"}/hero-bg.jpg`,
    "description": "Bihar's leading physical training academy for Bihar Police, Army Agniveer, RPF, SSC GD & Defence exams in Lakhisarai.",
    "telephone": "+91-7739776471",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "K.R.K Field, Lakhisarai",

      "addressLocality": "Lakhisarai",
      "addressRegion": "Bihar",
      "postalCode": "811311",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 25.1673,
      "longitude": 86.0945
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "05:00",
        "closes": "20:00"
      }
    ],
    "priceRange": "₹₹",
    "sameAs": [
      "https://youtube.com/@lakhisaraphysicalacademy",
      "https://www.facebook.com/share/19Nt5Nfw4x/",
      "https://instagram.com/lakhisaraphysicalacademy"
    ]
  };

  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FAQSchema({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  return (
    <Script
      id="faq-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
