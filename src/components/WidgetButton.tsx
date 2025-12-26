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

  const closeMenu = () => {
    setIsOpen(false);
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
        @keyframes popIn {
          0% {
            opacity: 0;
            transform: scale(0) translateY(20px);
          }
          50% {
            transform: scale(1.1) translateY(-5px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes slideUpMobile {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .widget-menu-button {
          transition: all 0.2s ease;
        }

        .widget-menu-button:active {
          transform: scale(0.95);
        }
      `}</style>

      {/* Main Blue Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 w-14 h-14 sm:w-16 sm:h-16 bg-blue-600 hover:bg-blue-700 rounded-full shadow-2xl flex items-center justify-center z-[60] transition-all duration-300 ${
          isOpen ? "rotate-45" : "hover:scale-110"
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
              strokeWidth={2.5}
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

      {/* Backdrop overlay to close menu */}
      {isOpen && <div className="fixed inset-0 z-[45]" onClick={closeMenu} />}

      {/* Desktop: Circle Layout ABOVE button */}
      {isOpen && (
        <div className="hidden lg:block fixed z-[50]">
          {widgets.map((widget, index) => {
            const totalWidgets = widgets.length;
            const baseAngle = 90; // Start at top (90 degrees)
            const spreadAngle = Math.min(totalWidgets * 35, 90); // Max 90 degree spread
            const startAngle = baseAngle - spreadAngle / 2;
            const angle =
              startAngle +
              (index * spreadAngle) / Math.max(totalWidgets - 1, 1);

            const radius = 110; // Distance from main button
            const x = Math.cos((angle * Math.PI) / 180) * radius;
            const y = Math.sin((angle * Math.PI) / 180) * radius;
            const iconUrl = extractIconUrl(widget.data.embed_code);

            return (
              <button
                key={widget.data.id}
                onClick={() => handleWidgetClick(widget)}
                className="widget-menu-button fixed w-16 h-16 bg-white hover:bg-blue-50 rounded-full shadow-2xl flex items-center justify-center border-2 border-gray-200 hover:border-blue-500"
                style={{
                  bottom: `${24 + 32 + y}px`, // ADDED y instead of subtracted
                  right: `${24 + 32 - x}px`,
                  animation: `popIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${
                    index * 0.08
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

      {/* Mobile & Tablet: Vertical List ABOVE button */}
      {isOpen && (
        <div
          className="lg:hidden fixed z-[50]"
          style={{ bottom: "104px", right: "24px" }}
        >
          <div className="flex flex-col-reverse gap-3">
            {widgets.map((widget, index) => {
              const iconUrl = extractIconUrl(widget.data.embed_code);

              return (
                <button
                  key={widget.data.id}
                  onClick={() => handleWidgetClick(widget)}
                  className="widget-menu-button w-12 h-12 sm:w-14 sm:h-14 bg-white hover:bg-blue-50 rounded-full shadow-2xl flex items-center justify-center border-2 border-gray-200 hover:border-blue-500"
                  style={{
                    animation: `slideUpMobile 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${
                      index * 0.08
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
                    <span className="text-xl sm:text-2xl">
                      {widget.type === "contact_widget" && "📞"}
                      {widget.type === "helpdesk_widget" && "💬"}
                      {widget.type === "w9form_widget" && "📄"}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Widget Container */}
      {selectedWidget && (
        <>
          <div ref={iframeRef} className="widget-container" />
          <button
            onClick={closeWidget}
            className="fixed top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center z-[1001] shadow-2xl transition-all hover:scale-110"
            aria-label="Close widget"
          >
            <svg
              className="w-6 h-6 sm:w-7 sm:h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </>
      )}
    </>
  );
}
