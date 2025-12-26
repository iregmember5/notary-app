import { useState } from 'react';
import type { Widget } from '../types/site-settings';

interface WidgetButtonProps {
  widgets: Widget[];
}

export default function WidgetButton({ widgets }: WidgetButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (widgets.length === 0) return null;

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

      {/* Widget Iframes - Render all at once */}
      {isOpen && widgets.map((widget) => (
        <div
          key={widget.data.id}
          className="fixed bottom-0 right-0 z-40"
          dangerouslySetInnerHTML={{ __html: widget.data.embed_code }}
        />
      ))}
    </>
  );
}
