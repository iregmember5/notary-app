import { useState, useEffect, useRef } from 'react';
import type { Widget } from '../types/site-settings';

interface WidgetButtonProps {
  widgets: Widget[];
}

export default function WidgetButton({ widgets }: WidgetButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedWidget, setSelectedWidget] = useState<Widget | null>(null);
  const iframeRef = useRef<HTMLDivElement>(null);

  if (widgets.length === 0) return null;

  const extractIconUrl = (embedCode: string): string => {
    const match = embedCode.match(/src=["']([^"']+)["']/);
    return match ? match[1] : '';
  };

  const handleWidgetClick = (widget: Widget) => {
    setSelectedWidget(widget);
    setIsOpen(false);
  };

  const closeWidget = () => {
    setSelectedWidget(null);
  };

  useEffect(() => {
    if (selectedWidget && iframeRef.current) {
      const container = iframeRef.current;
      container.innerHTML = selectedWidget.data.embed_code;
      
      // Execute scripts in the embed code
      const scripts = container.getElementsByTagName('script');
      for (let i = 0; i < scripts.length; i++) {
        const script = document.createElement('script');
        script.text = scripts[i].innerHTML;
        document.body.appendChild(script);
      }
    }
  }, [selectedWidget]);

  return (
    <>
      {/* Main Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg flex items-center justify-center z-50 transition-transform hover:scale-110"
      >
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>

      {/* Widget Buttons in Circle - Above the main button */}
      {isOpen && (
        <>
          {widgets.map((widget, index) => {
            const totalWidgets = widgets.length;
            const angle = 90 + ((index - (totalWidgets - 1) / 2) * 40); // Spread above: 50° to 130°
            const radius = 90;
            const x = Math.cos((angle * Math.PI) / 180) * radius;
            const y = Math.sin((angle * Math.PI) / 180) * radius;
            const iconUrl = extractIconUrl(widget.data.embed_code);
            
            return (
              <button
                key={widget.data.id}
                onClick={() => handleWidgetClick(widget)}
                className="fixed w-16 h-16 bg-white hover:bg-gray-50 rounded-full shadow-xl flex items-center justify-center z-50 transition-all hover:scale-110 border-2 border-gray-100"
                style={{
                  bottom: `${24 + 32 - y}px`,
                  right: `${24 + 32 - x}px`,
                }}
                title={widget.data.name}
              >
                {iconUrl ? (
                  <img src={iconUrl} alt={widget.data.name} className="w-12 h-12 object-contain" />
                ) : (
                  <span className="text-2xl">
                    {widget.type === 'contact_widget' && '📞'}
                    {widget.type === 'helpdesk_widget' && '💬'}
                    {widget.type === 'w9form_widget' && '📄'}
                  </span>
                )}
              </button>
            );
          })}
        </>
      )}

      {/* Widget Container */}
      {selectedWidget && (
        <>
          <div 
            ref={iframeRef}
            className="widget-container"
          />
          <button
            onClick={closeWidget}
            className="fixed bottom-[520px] right-8 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center z-[1001] shadow-lg"
          >
            ×
          </button>
        </>
      )}
    </>
  );
}
