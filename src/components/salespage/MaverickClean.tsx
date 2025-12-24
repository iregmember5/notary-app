import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Workbook from "./Workbook";
import IconRenderer from "./IconRenderer";
import {
  fetchLandingPageData,
  fetchAllFeaturesPages,
  fetchWorkbookPageData,
  prependImageUrl,
  type SalesPages,
  type FeaturesPageData,
} from "../../types/maverick";

const styles = `
  @keyframes scroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  
  .geometric-bg {
    background-color: #000000;
    background-image: 
      linear-gradient(30deg, #050505 12%, transparent 12.5%, transparent 87%, #050505 87.5%, #050505),
      linear-gradient(150deg, #050505 12%, transparent 12.5%, transparent 87%, #050505 87.5%, #050505),
      linear-gradient(30deg, #050505 12%, transparent 12.5%, transparent 87%, #050505 87.5%, #050505),
      linear-gradient(150deg, #050505 12%, transparent 12.5%, transparent 87%, #050505 87.5%, #050505),
      linear-gradient(60deg, #0a0a0a 25%, transparent 25.5%, transparent 75%, #0a0a0a 75%, #0a0a0a),
      linear-gradient(60deg, #0a0a0a 25%, transparent 25.5%, transparent 75%, #0a0a0a 75%, #0a0a0a);
    background-size: 80px 140px;
    background-position: 0 0, 0 0, 40px 70px, 40px 70px, 0 0, 40px 70px;
  }
`;

export default function Maverick() {
  const [showModal, setShowModal] = useState(false);
  const [showWorkbook, setShowWorkbook] = useState(false);
  const [pageData, setPageData] = useState<SalesPages | null>(null);
  const [workbookData, setWorkbookData] = useState<SalesPages | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetchLandingPageData(),
      fetchWorkbookPageData(),
    ])
      .then(([landingData, workbookData]) => {
        setPageData(landingData);
        setWorkbookData(workbookData);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  if (showWorkbook) {
    return <Workbook data={workbookData} />;
  }

  if (loading) {
    return (
      <div className="geometric-bg text-white fixed inset-0 w-screen h-screen flex items-center justify-center">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <style>{styles}</style>
      <div className="geometric-bg text-white fixed inset-0 w-screen h-screen overflow-y-auto">
        {/* Reusable Sections */}
        {pageData?.reusable_sections?.map((section, idx) => (
          <div key={idx} className="container mx-auto px-4 py-16">
            <h2 className="text-4xl font-bold mb-4 text-center">{section.heading}</h2>
            {section.subheading && <h3 className="text-2xl mb-4 text-center">{section.subheading}</h3>}
            {section.description && <p className="text-lg mb-8 text-center max-w-4xl mx-auto">{section.description}</p>}
            {section.cards && section.cards.length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {section.cards.map((card, i) => (
                  <div key={i} className="bg-gray-800 p-6 rounded-lg">
                    <h4 className="text-xl font-bold mb-2 text-yellow-500">{card.name}</h4>
                    {card.description && <p className="text-gray-300">{card.description}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Primary CTA */}
        {pageData?.primary_cta_section?.heading && (
          <div className="container mx-auto px-4 py-16">
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 text-black p-8 rounded-lg max-w-md mx-auto text-center">
              <h2 className="text-2xl font-bold mb-2">{pageData.primary_cta_section.heading}</h2>
              {pageData.primary_cta_section.description && (
                <p className="mb-6">{pageData.primary_cta_section.description}</p>
              )}
              {pageData.primary_cta_section.button?.text && (
                <button
                  onClick={() => setShowModal(true)}
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold py-3 px-6 rounded-full w-full hover:scale-105 transition-transform"
                >
                  🎯 {pageData.primary_cta_section.button.text}
                </button>
              )}
            </div>
          </div>
        )}

        {/* Registration Modal */}
        {showModal && (
          <div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
            onClick={() => setShowModal(false)}
          >
            <div
              className="bg-gradient-to-br from-gray-900 to-black border-2 border-yellow-500 rounded-lg max-w-md w-full p-8 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-yellow-500 hover:text-yellow-400 text-3xl font-bold"
              >
                &times;
              </button>
              <h2 className="text-2xl font-bold text-white mb-6">Request Early Access</h2>
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  setShowModal(false);
                  setShowWorkbook(true);
                }}
              >
                <div>
                  <label className="block text-white font-medium mb-1">First Name*</label>
                  <input
                    type="text"
                    required
                    className="w-full border-2 border-gray-700 bg-gray-800 rounded px-3 py-2 text-white focus:border-yellow-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-1">Email*</label>
                  <input
                    type="email"
                    required
                    className="w-full border-2 border-gray-700 bg-gray-800 rounded px-3 py-2 text-white focus:border-yellow-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-1">Phone*</label>
                  <input
                    type="tel"
                    required
                    className="w-full border-2 border-gray-700 bg-gray-800 rounded px-3 py-2 text-white focus:border-yellow-500 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold py-3 rounded-full hover:scale-105 transition-transform"
                >
                  🎯 SUBMIT
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
