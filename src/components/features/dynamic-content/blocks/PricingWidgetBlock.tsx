import React, { useEffect } from "react";
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

  useEffect(() => {
    // Execute any script tags in the widget code
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = value.widget_code;
    const scripts = tempDiv.querySelectorAll('script');
    
    scripts.forEach((script) => {
      const newScript = document.createElement('script');
      if (script.src) {
        newScript.src = script.src;
        newScript.async = script.async;
      } else {
        newScript.textContent = script.textContent;
      }
      document.head.appendChild(newScript);
    });
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
        <div 
          className="pricing-widget-container"
          dangerouslySetInnerHTML={{ __html: value.widget_code }} 
        />
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
