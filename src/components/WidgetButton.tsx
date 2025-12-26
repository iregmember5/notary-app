import { useState } from 'react';
import type { Widget } from '../types/site-settings';

interface WidgetButtonProps {
  widgets: Widget[];
}

export default function WidgetButton({ widgets }: WidgetButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedWidget, setSelectedWidget] = useState<Widget | null>(null);

  if (widgets.length === 0) return null;

  const handleWidgetClick = (widget: Widget) => {
    setSelectedWidget(widget);
    setIsOpen(false);
  };

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

      {/* Widget Buttons in Circle */}
      {isOpen && (
        <>
          {widgets.map((widget, index) => {
            const angle = 180 - (index * 40); // Left side arc: 180° to 100°
            const radius = 80;
            const x = Math.cos((angle * Math.PI) / 180) * radius;
            const y = Math.sin((angle * Math.PI) / 180) * radius;
            
            return (
              <button
                key={widget.data.id}
                onClick={() => handleWidgetClick(widget)}
                className="fixed w-14 h-14 bg-white hover:bg-gray-100 rounded-full shadow-lg flex items-center justify-center z-50 transition-all"
                style={{
                  bottom: `${24 + 32 - y}px`,
                  right: `${24 + 32 - x}px`,
                }}
                title={widget.data.name}
              >
                <span className="text-2xl">
                  {widget.type === 'contact_widget' && '📞'}
                  {widget.type === 'helpdesk_widget' && '💬'}
                  {widget.type === 'w9form_widget' && '📄'}
                </span>
              </button>
            );
          })}
        </>
      )}

      {/* Widget Iframe */}
      {selectedWidget && (
        <div
          className="fixed bottom-0 right-0 z-40"
          dangerouslySetInnerHTML={{ __html: selectedWidget.data.embed_code }}
        />
      )}
    </>
  );
}
