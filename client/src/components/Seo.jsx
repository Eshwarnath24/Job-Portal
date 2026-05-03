import { useEffect } from 'react';

const ensureMetaTag = (attribute, key, content) => {
  const selector = `meta[${attribute}="${key}"]`;
  let tag = document.head.querySelector(selector);

  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attribute, key);
    document.head.appendChild(tag);
  }

  tag.setAttribute('content', content);
};

const upsertCanonical = (url) => {
  let link = document.head.querySelector('link[rel="canonical"]');

  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }

  link.setAttribute('href', url);
};

const siteOrigin = () => import.meta.env.VITE_SITE_URL || window.location.origin;

const Seo = ({
  title,
  description,
  canonicalPath = '/',
  ogType = 'website',
  noIndex = false,
  imagePath = '/vite.svg',
  jsonLd
}) => {
  useEffect(() => {
    const canonicalUrl = new URL(canonicalPath, `${siteOrigin()}/`).toString();
    const imageUrl = new URL(imagePath, `${siteOrigin()}/`).toString();

    document.title = title;

    ensureMetaTag('name', 'description', description);
    ensureMetaTag('name', 'robots', noIndex ? 'noindex,nofollow' : 'index,follow');

    ensureMetaTag('property', 'og:type', ogType);
    ensureMetaTag('property', 'og:title', title);
    ensureMetaTag('property', 'og:description', description);
    ensureMetaTag('property', 'og:url', canonicalUrl);
    ensureMetaTag('property', 'og:image', imageUrl);

    ensureMetaTag('name', 'twitter:card', 'summary_large_image');
    ensureMetaTag('name', 'twitter:title', title);
    ensureMetaTag('name', 'twitter:description', description);
    ensureMetaTag('name', 'twitter:image', imageUrl);

    upsertCanonical(canonicalUrl);

    const existingJsonLd = document.head.querySelector('script[data-seo-jsonld="true"]');
    if (existingJsonLd) {
      existingJsonLd.remove();
    }

    if (jsonLd) {
      const script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      script.setAttribute('data-seo-jsonld', 'true');
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    return () => {
      const script = document.head.querySelector('script[data-seo-jsonld="true"]');
      if (script) {
        script.remove();
      }
    };
  }, [title, description, canonicalPath, ogType, noIndex, imagePath, jsonLd]);

  return null;
};

export default Seo;
