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
  if (!value) return null;

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !value.widget_code) return;

    // Clear any existing content
    containerRef.current.innerHTML = '';

    // Create the widget container div
    const widgetDiv = document.createElement('div');
    widgetDiv.id = 'widget-Untitled Pricing Table';
    containerRef.current.appendChild(widgetDiv);

    // Create and execute the script
    const script = document.createElement('script');
    script.textContent = `
      (function() {
        var script = document.createElement('script');
        script.src = 'https://pricing-bundler-green.vercel.app/widget-loader.js?slug=untitled-pricing-table-79';
        script.async = true;
        document.head.appendChild(script);
      })();
    `;
    
    containerRef.current.appendChild(script);

    // Cleanup function
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [value.widget_code]);

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
        <div className="w-full mx-auto max-w-6xl" ref={containerRef}>
          <div style={{
            padding: '40px 20px',
            textAlign: 'center',
            color: '#666',
            fontSize: '16px'
          }}>
            Loading pricing widget...
          </div>
        </div>
        {value.show_cta && value.cta && value.cta.text && (
          <div className="text-center mt-8">
            <a
              href={value.cta.url || '#'}
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
