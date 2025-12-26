import { useState } from 'react';
import type { Widget } from '../types/site-settings';

interface WidgetButtonProps {
  widgets: Widget[];
}

export default function WidgetButton({ widgets }: WidgetButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedWidget, setSelectedWidget] = useState<Widget | null>(null);

  console.log('WidgetButton widgets:', widgets);

  const handleWidgetClick = (widget: Widget) => {
    setSelectedWidget(widget);
    setIsOpen(false);
  };

  const closeWidget = () => {
    setSelectedWidget(null);
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

      {/* Widget Menu */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 bg-white rounded-lg shadow-xl p-4 z-50 w-64">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-gray-800">How can we help?</h3>
            <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="space-y-2">
            {widgets.length === 0 ? (
              <p className="text-gray-500 text-sm">No widgets available</p>
            ) : (
              widgets.map((widget, index) => (
                <button
                  key={widget.data?.id || index}
                  onClick={() => handleWidgetClick(widget)}
                  className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <span className="font-medium text-gray-700">{widget.data?.name || 'Widget'}</span>
                </button>
              ))
            )}
          </div>
        </div>
      )}

      {/* Widget Iframe Modal */}
      {selectedWidget && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md h-[600px] relative">
            <button
              onClick={closeWidget}
              className="absolute -top-3 -right-3 w-10 h-10 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center z-10"
            >
              ×
            </button>
            <iframe
              srcDoc={selectedWidget.data.embed_code}
              className="w-full h-full rounded-lg"
              title={selectedWidget.data.name}
            />
          </div>
        </div>
      )}
    </>
  );
}
