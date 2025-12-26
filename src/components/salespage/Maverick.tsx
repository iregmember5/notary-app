import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

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
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
  
  @keyframes glow {
    0%, 100% { box-shadow: 0 0 20px rgba(251, 191, 36, 0.5); }
    50% { box-shadow: 0 0 40px rgba(251, 191, 36, 0.8); }
  }
  
  .geometric-bg {
    background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%);
    position: relative;
  }
  
  .geometric-bg::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: 
      radial-gradient(circle at 20% 50%, rgba(251, 191, 36, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(249, 115, 22, 0.1) 0%, transparent 50%);
  }
`;

export default function TaxAdvisorLandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [pageData, setPageData] = useState<SalesPages | null>(null);

  const [_, setFeaturesData] = useState<FeaturesPageData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetchLandingPageData(),
      fetchAllFeaturesPages(),
      fetchWorkbookPageData(),
    ])
      .then(([landingData, featuresData]) => {
        setPageData(landingData);
        setFeaturesData(featuresData);

        setLoading(false);
      })
      .catch(console.error);
  }, []);

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
        {/* Top Banner */}
        {pageData?.header_section?.title && (
          <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white py-4 px-4 text-center font-bold shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 relative z-10">
              <p className="text-sm sm:text-base font-extrabold drop-shadow-lg">
                {pageData.header_section.title}
              </p>
              {pageData.header_section.button?.text && (
                <button className="bg-black hover:bg-gray-900 text-yellow-400 px-6 py-2.5 rounded-full text-xs sm:text-sm flex items-center gap-2 whitespace-nowrap font-bold shadow-xl hover:scale-105 transition-all">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                  {pageData.header_section.button.text}
                </button>
              )}
            </div>
          </div>
        )}
        {pageData?.header_section?.line_one && (
          <p className="text-xl sm:text-sm mt-2 text-center font-bold text-yellow-300">
            {pageData.header_section.line_one}
          </p>
        )}

        {/* Hero Section */}
        <div className="relative overflow-hidden py-20">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 via-orange-500/10 to-transparent"></div>
          <div className="absolute top-20 right-20 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />

          <div className="container mx-auto px-4 py-12 relative max-w-7xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="text-center md:text-left space-y-8">
                {pageData?.main_hero_section?.heading && (
                  <h1 className="text-5xl sm:text-6xl md:text-7xl font-black mb-6 leading-tight bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent drop-shadow-2xl">
                    {pageData.main_hero_section.heading}
                  </h1>
                )}
                {pageData?.main_hero_section?.subheading && (
                  <p className="text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto md:mx-0 mb-8 leading-relaxed">
                    {pageData.main_hero_section.subheading}
                  </p>
                )}

                <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-2 border-yellow-500 rounded-2xl p-6 backdrop-blur-sm">
                  <div className="text-yellow-400 font-bold text-xl mb-2">
                    {pageData?.secondary_cta_section?.announcement || ""}
                  </div>
                  {pageData?.secondary_cta_section?.announcement && (
                    <span className="text-white text-sm font-semibold">
                      ON ZOOM (Link Sent to Email)
                    </span>
                  )}
                </div>

                {pageData?.main_hero_section?.button?.text && (
                  <button className="bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 text-black font-black py-5 px-10 rounded-full text-xl hover:scale-110 transition-all shadow-2xl hover:shadow-yellow-500/50 animate-[glow_2s_ease-in-out_infinite]">
                    🎯 {pageData.main_hero_section.button.text}
                  </button>
                )}
              </div>
              <div className="relative">
                {pageData?.main_hero_section?.image?.url && (
                  <div className="relative animate-[float_6s_ease-in-out_infinite]">
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-3xl blur-2xl opacity-50" />
                    <img
                      src={prependImageUrl(pageData.main_hero_section.image.url)}
                      alt="Workshop Hero"
                      className="relative rounded-3xl shadow-2xl w-full border-4 border-yellow-500/30"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Featured On Section */}
        {pageData?.featured_on_section?.items &&
          pageData.featured_on_section.items.length > 0 && (
            <div className="py-12 border-y border-gray-800 overflow-hidden">
              <p className="text-center text-gray-400 mb-6">
                {pageData.featured_on_section.heading}
              </p>
              <div className="flex items-center gap-12 px-4 animate-[scroll_20s_linear_infinite]">
                {[...Array(2)].map((_, idx) => (
                  <div key={idx} className="flex items-center gap-12 shrink-0">
                    {pageData.featured_on_section.items.map(
                      (item: any, i: number) => (
                        <div key={i} className="flex items-center gap-3">
                          {item.icon ? (
                            <IconRenderer
                              iconPath={item.icon}
                              className="w-8 h-8 text-white"
                            />
                          ) : (
                            <svg
                              className="w-8 h-8 text-gray-500"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <circle cx="12" cy="12" r="10" />
                            </svg>
                          )}
                          <span className="text-gray-500 text-2xl font-bold whitespace-nowrap">
                            {item.name}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

        {/* What You'll Learn */}
        {pageData?.card_sections?.cards &&
          pageData.card_sections.cards.length > 0 && (
            <div className="container mx-auto px-4 py-16">
              {pageData.card_sections.main_header && (
                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                  {pageData.card_sections.main_header}
                </h2>
              )}
              {pageData.card_sections.footer_title && (
                <p className="text-xl mb-6 text-center text-gray-300">
                  {pageData.card_sections.footer_title}
                </p>
              )}
              <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 p-8 md:p-12 rounded-3xl max-w-4xl mx-auto border-2 border-yellow-500/30 shadow-2xl shadow-yellow-500/20">
                {(() => {
                  return pageData.card_sections.cards.map((card: any, idx: number) => (
                    <div
                      key={idx}
                      className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 p-6 md:p-8 rounded-2xl shadow-xl border-2 border-yellow-500/20 mb-6 hover:border-yellow-500/50 transition-all hover:scale-105"
                    >
                      {card.title && (
                        <h3 className="text-yellow-400 font-black text-2xl mb-4 flex items-center gap-3">
                          <span className="text-3xl">✨</span>
                          {card.title}
                        </h3>
                      )}
                      {card.subtitle && (
                        <h4 className="text-white font-bold text-xl mb-4">
                          {card.subtitle}
                        </h4>
                      )}
                      {card.description && (
                        <p className="text-gray-300 text-base leading-relaxed">
                          {card.description}
                        </p>
                      )}
                    </div>
                  ));
                })()}
              </div>
            </div>
          )}

        {/* Free Registration Banner */}
        {pageData?.secondary_cta_section?.heading && (
          <div className="container mx-auto px-4 py-8">
            <div className="border-4 border-yellow-500 rounded-2xl p-10 text-center bg-gradient-to-br from-black via-gray-900 to-black shadow-2xl shadow-yellow-500/30 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 via-orange-500/5 to-yellow-500/5 animate-pulse" />
              <h2 className="text-3xl font-black mb-6 relative z-10">
                {pageData.secondary_cta_section.heading}
                {pageData.secondary_cta_section.description && (
                  <>
                    <br />
                    <span className="text-yellow-400 text-4xl mt-2 inline-block">
                      {pageData.secondary_cta_section.description}
                    </span>
                  </>
                )}
              </h2>
              {pageData.secondary_cta_section.announcement && (
                <p className="text-2xl mb-6 text-gray-300 relative z-10">
                  {pageData.secondary_cta_section.announcement}
                </p>
              )}
              {pageData.secondary_cta_section.button?.text && (
                <button className="bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 text-black font-black py-5 px-10 rounded-full text-xl hover:scale-110 transition-all shadow-2xl hover:shadow-yellow-500/50 relative z-10">
                  🎯 {pageData.secondary_cta_section.button.text}
                </button>
              )}
            </div>
          </div>
        )}

        {/* Meet Your Speakers */}
        {pageData?.images_gallery_section?.images && pageData.images_gallery_section.images.filter((img: any) => img.image).length > 0 && (
          <div className="container mx-auto px-4 py-16">
            {pageData.images_gallery_section.heading && (
              <div className="border-2 border-dashed border-yellow-500 rounded-full py-3 px-8 text-center inline-block mx-auto mb-12 block w-fit">
                <h2 className="text-2xl font-bold">
                  {pageData.images_gallery_section.heading}
                </h2>
              </div>
            )}
            <div className="grid grid-cols-2 lg:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {pageData.images_gallery_section.images
                .filter((img: any) => img.image)
                .map((img: any, i: number) => (
                  <div key={i} className="text-center">
                    <img
                      src={prependImageUrl(img.image?.url)}
                      alt={img.caption || "Speaker"}
                      className="w-64 h-64 rounded-full mx-auto object-cover"
                    />
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Pricing Section */}
        {pageData?.primary_cta_section?.heading && (
          <div className="container mx-auto px-4 py-16">
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 text-black p-8 rounded-lg max-w-md mx-auto text-center">
              <p className="text-sm mb-2">
                {pageData.primary_cta_section.heading}
              </p>
              {pageData.primary_cta_section.subtitle && (
                <h2 className="text-4xl font-bold mb-2">
                  {pageData.primary_cta_section.subtitle}
                </h2>
              )}
              {pageData.primary_cta_section.description && (
                <p className="text-xs mb-6">
                  {pageData.primary_cta_section.description}
                </p>
              )}
              {pageData.primary_cta_section.subdescription && (
                <p className="text-sm font-bold mb-4">
                  {pageData.primary_cta_section.subdescription}
                </p>
              )}
              {pageData.primary_cta_section.button?.text && (
                <button className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold py-3 px-6 rounded-full w-full hover:scale-105 transition-transform">
                  🎯 {pageData.primary_cta_section.button.text}
                </button>
              )}
            </div>
          </div>
        )}

        {/* Reusable Sections */}
        {pageData?.reusable_sections?.filter((s: any) => s.heading || s.subheading || s.description || s.subdescription || s.button?.text || s.image || (s.cards?.length > 0)).map((section: any, idx: number) => (
          <div key={idx} className="container mx-auto px-4 py-16">
            {section.heading && (
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                {section.heading}
              </h2>
            )}
            {section.subheading && (
              <h3 className="text-xl md:text-2xl font-semibold mb-4 text-center text-yellow-500">
                {section.subheading}
              </h3>
            )}
            {section.description && (
              <p className="text-lg mb-6 text-center max-w-4xl mx-auto">
                {section.description}
              </p>
            )}
            {section.subdescription && (
              <p className="text-base mb-6 text-center text-gray-400">
                {section.subdescription}
              </p>
            )}
            {section.button?.text && (
              <div className="text-center mb-8">
                <button className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold py-4 px-8 rounded-full text-lg hover:scale-105 transition-transform">
                  🎯 {section.button.text}
                </button>
              </div>
            )}
            {section.image && (
              <div className="max-w-4xl mx-auto mb-8">
                <img
                  src={prependImageUrl(section.image.url)}
                  alt={section.heading || "Section image"}
                  className="rounded-lg mx-auto w-full"
                />
              </div>
            )}
            {section.cards && section.cards.length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {section.cards.filter((c: any) => c.name || c.description).map((card: any, i: number) => (
                  <div
                    key={i}
                    className="bg-gray-800 p-6 rounded-lg border border-gray-700"
                  >
                    {card.name && (
                      <h4 className="text-yellow-500 text-lg font-bold mb-3">
                        {card.name}
                      </h4>
                    )}
                    {card.description && (
                      <p
                        className="text-gray-300 text-sm"
                        style={{ whiteSpace: "pre-line" }}
                      >
                        {card.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Simple CTA Sections */}
        {pageData?.simple_cta_sections?.filter((c: any) => c.heading || c.subtitle || c.description || c.button?.text).map((cta: any, idx: number) => (
          <div key={idx} className="container mx-auto px-4 py-16 text-center">
            {cta.heading && (
              <h2 className="text-3xl font-bold mb-4">{cta.heading}</h2>
            )}
            {cta.subtitle && <p className="text-xl mb-8">{cta.subtitle}</p>}
            {cta.description && <p className="mb-4">{cta.description}</p>}
            {cta.button?.text && (
              <button className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold py-4 px-8 rounded-full text-lg hover:scale-105 transition-transform">
                🎯 {cta.button.text}
              </button>
            )}
          </div>
        ))}

        {/* Web Form Section */}
        {pageData?.web_form_section?.form && (
          <div className="container mx-auto px-4 py-16">
            {pageData.web_form_section.heading && (
              <h2 className="text-3xl font-bold mb-4 text-center">
                {pageData.web_form_section.heading}
              </h2>
            )}
            {pageData.web_form_section.description && (
              <p className="text-center mb-8">
                {pageData.web_form_section.description}
              </p>
            )}
            <div className="max-w-2xl mx-auto">
              {/* Form rendering would go here */}
              <p className="text-center text-gray-400">
                Form ID: {pageData.web_form_section.form}
              </p>
            </div>
          </div>
        )}

        {/* Calendar Section */}
        {pageData?.calendar_section?.embed_code && (
          <div className="container mx-auto px-4 py-16">
            {pageData.calendar_section.heading && (
              <h2 className="text-3xl font-bold mb-8 text-center">
                {pageData.calendar_section.heading}
              </h2>
            )}
            <div
              className="max-w-4xl mx-auto"
              dangerouslySetInnerHTML={{
                __html: pageData.calendar_section.embed_code,
              }}
            />
          </div>
        )}

        {/* FAQ Section */}
        {pageData?.faq_section?.faqs &&
          pageData.faq_section.faqs.length > 0 && (
            <div className="container mx-auto px-4 py-16">
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black py-4 px-6 rounded-t-lg text-center">
                <h2 className="text-2xl font-bold">
                  {pageData.faq_section.heading}
                </h2>
              </div>
              <div className="bg-white text-black rounded-b-lg overflow-hidden">
                {pageData.faq_section.faqs.map((faq: any, i: number) => (
                  <div key={i} className="border-b border-gray-200">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full text-left p-4 flex justify-between items-center hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-sm font-medium">
                        {faq.question}
                      </span>
                      {openFaq === i ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </button>
                    {openFaq === i && (
                      <div
                        className="px-4 pb-4 text-sm text-gray-600"
                        dangerouslySetInnerHTML={{ __html: faq.answer }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

      </div>
    </>
  );
}
