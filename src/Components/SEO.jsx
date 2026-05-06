import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title = "Zaivo | Done. Before You Do.", 
  description = "Zaivo turns operations into systems that run, adapt, and deliver — without constant input.", 
  url = "https://zaivo.com" 
}) => {
  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Open Graph / Facebook (Makes link previews look good) */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {/* Optional: Add an image URL for the link preview */}
      {/* <meta property="og:image" content="https://yourwebsite.com/preview-image.png" /> */}

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      {/* <meta property="twitter:image" content="https://yourwebsite.com/preview-image.png" /> */}
    </Helmet>
  );
};

export default SEO;
