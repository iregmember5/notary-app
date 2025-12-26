import { useState, useEffect, useRef } from "react";
import type { Widget } from "../types/site-settings";

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
    return match ? match[1] : "";
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

      const scripts = container.getElementsByTagName("script");
      for (let i = 0; i < scripts.length; i++) {
        const script = document.createElement("script");
        script.text = scripts[i].innerHTML;
        document.body.appendChild(script);
      }
    }
  }, [selectedWidget]);

  return (
    <>
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: scale(0.3) translateY(30px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .widget-icon-button {
          transition: all 0.3s ease;
        }

        .widget-icon-button:active {
          transform: scale(0.9);
        }
      `}</style>

      {/* Main Blue Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 w-14 h-14 sm:w-16 sm:h-16 bg-blue-600 hover:bg-blue-700 rounded-full shadow-2xl flex items-center justify-center z-50 transition-all duration-300 ${
          isOpen ? "rotate-45 scale-110" : "hover:scale-110"
        }`}
        aria-label="Toggle widgets"
      >
        {isOpen ? (
          <svg
            className="w-7 h-7 sm:w-8 sm:h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="w-7 h-7 sm:w-8 sm:h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        )}
      </button>

      {/* Desktop: Circle Layout (above lg screens) */}
      {isOpen && (
        <div className="hidden lg:block fixed z-40">
          {widgets.map((widget, index) => {
            const totalWidgets = widgets.length;
            const angle = 90 + (index - (totalWidgets - 1) / 2) * 45;
            const radius = 100;
            const x = Math.cos((angle * Math.PI) / 180) * radius;
            const y = Math.sin((angle * Math.PI) / 180) * radius;
            const iconUrl = extractIconUrl(widget.data.embed_code);

            return (
              <button
                key={widget.data.id}
                onClick={() => handleWidgetClick(widget)}
                className="widget-icon-button fixed w-16 h-16 bg-white hover:bg-gray-50 rounded-full shadow-2xl flex items-center justify-center border-2 border-gray-200 hover:border-blue-400"
                style={{
                  bottom: `${24 + 32 - y}px`,
                  right: `${24 + 32 - x}px`,
                  animation: `slideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) ${
                    index * 0.1
                  }s both`,
                }}
                title={widget.data.name}
              >
                {iconUrl ? (
                  <img
                    src={iconUrl}
                    alt={widget.data.name}
                    className="w-11 h-11 object-contain"
                  />
                ) : (
                  <span className="text-3xl">
                    {widget.type === "contact_widget" && "📞"}
                    {widget.type === "helpdesk_widget" && "💬"}
                    {widget.type === "w9form_widget" && "📄"}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Tablet & Mobile: Vertical List */}
      {isOpen && (
        <div className="lg:hidden fixed bottom-24 right-6 sm:right-6 flex flex-col gap-3 z-40">
          {widgets.map((widget, index) => {
            const iconUrl = extractIconUrl(widget.data.embed_code);

            return (
              <button
                key={widget.data.id}
                onClick={() => handleWidgetClick(widget)}
                className="widget-icon-button w-12 h-12 sm:w-14 sm:h-14 bg-white hover:bg-gray-50 rounded-full shadow-2xl flex items-center justify-center border-2 border-gray-200 hover:border-blue-400"
                style={{
                  animation: `slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) ${
                    index * 0.1
                  }s both`,
                }}
                title={widget.data.name}
              >
                {iconUrl ? (
                  <img
                    src={iconUrl}
                    alt={widget.data.name}
                    className="w-9 h-9 sm:w-10 sm:h-10 object-contain"
                  />
                ) : (
                  <span className="text-2xl sm:text-2xl">
                    {widget.type === "contact_widget" && "📞"}
                    {widget.type === "helpdesk_widget" && "💬"}
                    {widget.type === "w9form_widget" && "📄"}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Widget Container */}
      {selectedWidget && (
        <>
          <div ref={iframeRef} className="widget-container" />
          <button
            onClick={closeWidget}
            className="fixed bottom-[480px] sm:bottom-[520px] right-6 sm:right-8 w-10 h-10 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center z-[1001] shadow-2xl transition-all hover:scale-110 text-2xl font-bold"
            aria-label="Close widget"
          >
            ×
          </button>
        </>
      )}
    </>
  );
}
