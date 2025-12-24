import React, { useEffect, useRef } from "react";
import type { Theme } from "../../../../types/features-page";

interface PricingWidgetBlockProps {
  value: any;
  theme: Theme;
}

export const PricingWidgetBlock: React.FC<PricingWidgetBlockProps> = ({
  value,
  theme,
}) => {
  if (!value || !value.widget_code) return null;

  const containerRef = useRef<HTMLDivElement>(null);
  const slug = "untitled-pricing-table-79";
  const containerId = `widget-${slug}`;

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.id = containerId;
      containerRef.current.innerHTML = `
        <div style="
          padding: 60px 20px;
          text-align: center;
          color: #666;
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 18px;
        ">
          Loading pricing widget...
        </div>
      `;
    }

    const script = document.createElement('script');
    script.src = `https://pricing-bundler-green.vercel.app/widget-loader.js?slug=${slug}`;
    script.async = true;
    containerRef.current?.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [slug]);

  return (
    <section className="py-16" style={{ backgroundColor: theme.bgColor }}>
      <div className="container mx-auto px-4">
        {value.heading && (
          <h2
            className="text-4xl font-bold text-center mb-4"
            style={{ color: theme.primaryColor }}
          >
            {value.heading}
          </h2>
        )}
        {value.description && (
          <p
            className="text-xl text-center mb-8"
            style={{ color: theme.neutralColor }}
          >
            {value.description}
          </p>
        )}
        <div className="w-full mx-auto max-w-6xl">
          <div ref={containerRef} />
        </div>
        {value.show_cta && value.cta && (
          <div className="text-center mt-8">
            <a
              href={value.cta.url}
              className="inline-block px-8 py-3 rounded-lg font-semibold transition-colors"
              style={{
                backgroundColor: theme.primaryColor,
                color: theme.bgColor,
              }}
            >
              {value.cta.text}
            </a>
          </div>
        )}
      </div>
    </section>
  );
};
