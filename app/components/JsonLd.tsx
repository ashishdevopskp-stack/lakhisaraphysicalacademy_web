import Script from "next/script";

export function OrganizationSchema() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.lakhisaraiphysicalacademy.com";

  const schema = {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "SportsActivityLocation", "LocalBusiness", "SportsClub"],
    "name": "Lakhisarai Physical Academy",
    "alternateName": ["लखीसराय फिजिकल एकेडमी", "best training academy", "lakhisaraphysicalacademy", "LPA Defence Academy"],
    "url": baseUrl,
    "logo": `${baseUrl}/logo.png`,
    "image": `${baseUrl}/hero-bg.jpg`,
    "description": "Lakhisarai Physical Academy (लखीसराय फिजिकल एकेडमी) is Bihar's premier best physical training academy at K.R.K Field Lakhisarai for Indian Army Agniveer, Bihar Police Constable, SI (Daroga), SSC GD, RPF & Defence ground tests.",
    "telephone": "+91-7739776471",
    "email": "lakhisaraphysicalacademy@gmail.com",
    "priceRange": "₹₹",
    "currenciesAccepted": "INR",
    "paymentAccepted": "Cash, UPI, Credit Card, Debit Card",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "K.R.K Field, Lakhisarai Main Road",
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
    "areaServed": [
      {
        "@type": "City",
        "name": "Lakhisarai",
        "sameAs": "https://en.wikipedia.org/wiki/Lakhisarai"
      },
      {
        "@type": "City",
        "name": "Munger",
        "sameAs": "https://en.wikipedia.org/wiki/Munger"
      },
      {
        "@type": "City",
        "name": "Jamui",
        "sameAs": "https://en.wikipedia.org/wiki/Jamui"
      },
      {
        "@type": "City",
        "name": "Sheikhpura",
        "sameAs": "https://en.wikipedia.org/wiki/Sheikhpura"
      },
      {
        "@type": "City",
        "name": "Begusarai",
        "sameAs": "https://en.wikipedia.org/wiki/Begusarai"
      },
      {
        "@type": "City",
        "name": "Patna",
        "sameAs": "https://en.wikipedia.org/wiki/Patna"
      },
      {
        "@type": "State",
        "name": "Bihar",
        "sameAs": "https://en.wikipedia.org/wiki/Bihar"
      }
    ],
    "knowsAbout": [
      "Indian Army Agniveer Physical Training",
      "Bihar Police Constable & SI Daroga Ground Test",
      "1600m Running Speed & Stamina Technique",
      "High Jump Scissor & Tiger Jump Training",
      "Shot Put 16lb & 12lb Throw",
      "SSC GD & RPF Physical Efficiency Test",
      "Knock Knee & Flat Foot Medical Checkup"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "250",
      "bestRating": "5.0",
      "worstRating": "1.0"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "05:00",
        "closes": "20:00"
      }
    ],
    "sameAs": [
      "https://youtube.com/@lakhisaraphysicalacademy",
      "https://www.facebook.com/share/19Nt5Nfw4x/",
      "https://instagram.com/lakhisaraphysicalacademy",
      "https://play.google.com/store/apps/details?id=com.lakhisarai.physical_academy"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Lakhisarai Physical Academy",
    "alternateName": "lakhisaraphysicalacademy",
    "url": baseUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${baseUrl}/blogs?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Indian Army & Bihar Police Complete Physical Ground Training",
    "description": "Comprehensive physical fitness course for 1600m running, high jump, shot put, long jump, and medical evaluation by expert military coaches Ganesh Sir & Mahesh Sir.",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "Lakhisarai Physical Academy",
      "sameAs": baseUrl
    }
  };

  return (
    <>
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <Script
        id="course-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
    </>
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
