import React, { useEffect, useRef } from "react";
import type { DynamicContentBlock } from "../../types/landing";
import EasyIcon from "./IconRenderer";

const API_BASE_URL = "https://esign-admin.signmary.com";

const extractYouTubeId = (url: string): string => {
  if (!url) return "";
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/
  );
  return match ? match[1] : "";
};

const getFullImageUrl = (url: string): string => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${API_BASE_URL}${url}`;
};

const ScrollAnimateCard: React.FC<any> = ({
  bgClass,
  cardData,
  title,
  description,
  icon,
  features,
  formatDescription,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = React.useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    
    // Fallback for mobile - show after short delay
    const fallbackTimer = setTimeout(() => setIsVisible(true), 100);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            card.classList.add("animate-fadeInUp");
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(card);
    return () => {
      observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`${isVisible ? 'opacity-100' : 'opacity-0'} group ${
        cardData.card_background ? "" : `bg-gradient-to-br ${bgClass}`
      } rounded-2xl p-6 md:p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 border-2 border-slate-200 hover:border-blue-300`}
      style={
        cardData.card_background
          ? {
              backgroundImage: `url(${getFullImageUrl(
                cardData.card_background.url
              )})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : {}
      }
    >
      {icon && (
        <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
          <EasyIcon icon={icon} size={28} color="#FFFFFF" />
        </div>
      )}

      {cardData.card_image && (
        <div className="w-full h-52 rounded-xl mb-6 overflow-hidden border-2 border-white shadow-lg">
          <img
            src={getFullImageUrl(cardData.card_image.url)}
            alt={cardData.card_image.title || title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}

      <h4 className="text-2xl md:text-3xl font-extrabold mb-4 leading-tight text-slate-900">
        {title || "Card Title"}
      </h4>

      {description && (
        <div className="text-slate-600 leading-relaxed text-base font-medium">
          <ul className="space-y-2">{formatDescription(description)}</ul>
        </div>
      )}

      {(cardData.price || cardData.price_period) && (
        <div className="mb-6 mt-4">
          <span className="text-4xl font-extrabold text-slate-900">
            {cardData.price}
          </span>
          {cardData.price_period && (
            <span className="text-slate-600 ml-2 font-medium">
              {cardData.price_period}
            </span>
          )}
        </div>
      )}

      {features && features.length > 0 && (
        <ul className="space-y-3 mt-6">
          {features.map((feature: string, featureIdx: number) => (
            <li key={featureIdx} className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-gradient-to-br from-emerald-500 to-green-600 shadow-sm">
                <EasyIcon icon="FiCheck" size={14} color="#FFFFFF" />
              </div>
              <span className="text-slate-700 text-base leading-relaxed font-medium">
                {feature}
              </span>
            </li>
          ))}
        </ul>
      )}

      {cardData.button_text && cardData.button_url && (
        <div className="mt-8 pt-6 border-t-2 border-slate-100">
          <a
            href={cardData.button_url}
            className="inline-flex items-center gap-2 font-bold text-blue-600 transition-all duration-300 hover:gap-3 group/btn"
          >
            {cardData.button_text}
            <EasyIcon icon="FiArrowRight" size={18} color="#3B82F6" />
          </a>
        </div>
      )}
    </div>
  );
};

const DynamicContentRenderer: React.FC<{ block: DynamicContentBlock }> = ({
  block,
}) => {
  switch (block.type) {
    case "rich_text":
      const richRef = useRef<HTMLDivElement>(null);
      const [isRichVisible, setIsRichVisible] = React.useState(false);
      
      useEffect(() => {
        const el = richRef.current;
        if (!el) return;
        
        // Fallback for mobile
        const fallbackTimer = setTimeout(() => setIsRichVisible(true), 100);
        
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setIsRichVisible(true);
                el.classList.add("animate-fadeInUp");
              }
            });
          },
          { threshold: 0.05 }
        );
        observer.observe(el);
        return () => {
          observer.disconnect();
          clearTimeout(fallbackTimer);
        };
      }, []);
      return (
        <div className="relative px-2 sm:px-4 max-w-5xl mx-auto mb-20">
          <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl opacity-20 blur-2xl animate-pulse" />
          <div className="hidden sm:block absolute -top-8 -left-8 w-32 h-32 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full blur-3xl opacity-30 animate-pulse" />
          <div className="hidden sm:block absolute -bottom-8 -right-8 w-40 h-40 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }} />
          
          <div
            ref={richRef}
            className={`${isRichVisible ? 'opacity-100' : 'opacity-0'} relative prose prose-xl max-w-none px-4 sm:px-6 md:px-10 py-6 sm:py-10 md:py-14 rounded-3xl bg-gradient-to-br from-white via-blue-50/80 to-purple-50/80 shadow-[0_20px_70px_rgba(59,130,246,0.25)] hover:shadow-[0_25px_80px_rgba(139,92,246,0.35)] transition-all duration-500 backdrop-blur-sm border-2 border-transparent hover:border-blue-200 [&>h1]:text-3xl sm:[&>h1]:text-4xl md:[&>h1]:text-5xl [&>h1]:font-black [&>h1]:mb-6 md:[&>h1]:mb-10 [&>h1]:bg-gradient-to-r [&>h1]:from-blue-600 [&>h1]:via-purple-600 [&>h1]:to-pink-600 [&>h1]:bg-clip-text [&>h1]:text-transparent [&>h1]:leading-tight [&>h2]:text-2xl sm:[&>h2]:text-3xl md:[&>h2]:text-4xl [&>h2]:font-extrabold [&>h2]:mb-6 md:[&>h2]:mb-8 [&>h2]:text-slate-900 [&>h2]:relative [&>h2]:pl-6 md:[&>h2]:pl-8 [&>h2]:before:absolute [&>h2]:before:left-0 [&>h2]:before:top-0 [&>h2]:before:bottom-0 [&>h2]:before:w-2 [&>h2]:before:bg-gradient-to-b [&>h2]:before:from-blue-500 [&>h2]:before:to-purple-500 [&>h2]:before:rounded-full [&>h3]:text-xl sm:[&>h3]:text-2xl md:[&>h3]:text-3xl [&>h3]:font-bold [&>h3]:mb-4 md:[&>h3]:mb-6 [&>h3]:text-slate-800 [&>p]:text-base sm:[&>p]:text-lg md:[&>p]:text-xl [&>p]:leading-relaxed [&>p]:mb-4 md:[&>p]:mb-6 [&>p]:text-slate-700 [&>ul]:space-y-3 md:[&>ul]:space-y-4 [&>ul]:mb-6 md:[&>ul]:mb-8 [&>ul>li]:text-slate-700 [&>ul>li]:text-base md:[&>ul>li]:text-lg [&>ul>li]:relative [&>ul>li]:pl-6 md:[&>ul>li]:pl-8 [&>ul>li]:before:absolute [&>ul>li]:before:left-0 [&>ul>li]:before:top-2 [&>ul>li]:before:w-3 [&>ul>li]:before:h-3 [&>ul>li]:before:bg-gradient-to-r [&>ul>li]:before:from-blue-500 [&>ul>li]:before:to-purple-500 [&>ul>li]:before:rounded-full [&>ul>li]:before:shadow-lg [&>ol]:space-y-3 md:[&>ol]:space-y-4 [&>ol]:mb-6 md:[&>ol]:mb-8 [&>ol>li]:text-slate-700 [&>ol>li]:text-base md:[&>ol>li]:text-lg [&>ol>li]:font-medium [&>a]:text-blue-600 [&>a]:font-bold [&>a]:underline [&>a]:decoration-2 [&>a]:underline-offset-4 [&>a:hover]:text-purple-600 [&>a:hover]:decoration-purple-600 [&>a]:transition-all [&>strong]:font-extrabold [&>strong]:text-transparent [&>strong]:bg-gradient-to-r [&>strong]:from-blue-600 [&>strong]:to-purple-600 [&>strong]:bg-clip-text [&>blockquote]:border-l-[6px] [&>blockquote]:border-gradient-to-b [&>blockquote]:from-blue-500 [&>blockquote]:to-purple-500 [&>blockquote]:pl-6 md:[&>blockquote]:pl-10 [&>blockquote]:py-6 md:[&>blockquote]:py-8 [&>blockquote]:bg-gradient-to-r [&>blockquote]:from-blue-100/80 [&>blockquote]:to-purple-100/80 [&>blockquote]:rounded-r-2xl [&>blockquote]:my-6 md:[&>blockquote]:my-10 [&>blockquote]:text-slate-800 [&>blockquote]:text-lg md:[&>blockquote]:text-xl [&>blockquote]:font-semibold [&>blockquote]:italic [&>blockquote]:shadow-xl`}
            dangerouslySetInnerHTML={{ __html: block.value }}
          />
        </div>
      );

    case "blockquote":
      return (
        <blockquote className="border-l-4 border-blue-500 pl-8 py-6 mb-12 bg-gradient-to-r from-blue-50 to-transparent rounded-r-xl shadow-md">
          <p className="text-xl text-slate-700 font-medium leading-relaxed italic">
            "{block.value.text}"
          </p>
          {block.value.author && (
            <footer className="text-sm text-slate-600 mt-4 not-italic font-bold">
              — {block.value.author}
              {block.value.source && (
                <span className="text-slate-500 font-normal">
                  {" "}
                  ({block.value.source})
                </span>
              )}
            </footer>
          )}
        </blockquote>
      );

    case "cta":
      return (
        <div
          className="relative p-6 sm:p-10 md:p-16 rounded-2xl mb-16 text-white overflow-hidden shadow-2xl"
          style={{
            backgroundImage: block.value.background_image
              ? `url(${getFullImageUrl(block.value.background_image.url)})`
              : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundColor: block.value.background_image
              ? "transparent"
              : "#3B82F6",
          }}
        >
          {block.value.background_image && (
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
          )}
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 md:mb-6 drop-shadow-lg">
              {block.value.title}
            </h3>
            {block.value.description && (
              <p className="text-base sm:text-lg md:text-xl mb-6 md:mb-10 opacity-95 leading-relaxed font-medium">
                {block.value.description}
              </p>
            )}
            <a
              href={block.value.button_url}
              className={`inline-block px-10 py-5 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                block.value.button_style === "primary"
                  ? "bg-white text-blue-600 hover:bg-gray-100"
                  : block.value.button_style === "secondary"
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "border-3 border-white text-white hover:bg-white hover:text-blue-600"
              }`}
            >
              {block.value.button_text}
            </a>
          </div>
        </div>
      );

    case "video":
      return (
        <div className="mb-16">
          <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
            <iframe
              src={`https://www.youtube.com/embed/${extractYouTubeId(
                block.value.video_url || ""
              )}?autoplay=${block.value.autoplay === "true" ? 1 : 0}&controls=${
                block.value.controls === "true" ? 1 : 0
              }&loop=${block.value.loop === "true" ? 1 : 0}&mute=${
                block.value.muted === "true" ? 1 : 0
              }`}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Video content"
            />
          </div>
        </div>
      );

    case "card_grid":
      return (
        <div className="mb-20">
          {block.value.heading && (
            <h3 className="text-4xl md:text-5xl font-extrabold mb-6 text-center text-slate-900">
              {block.value.heading}
            </h3>
          )}
          {block.value.subheading && (
            <p className="text-slate-600 mb-16 text-center text-lg md:text-xl max-w-4xl mx-auto leading-relaxed font-medium">
              {block.value.subheading}
            </p>
          )}
          <div
            className={`grid gap-8 ${
              block.value.cards?.length === 2
                ? "grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto"
                : block.value.columns === "1"
                ? "grid-cols-1"
                : block.value.columns === "2"
                ? "grid-cols-1 md:grid-cols-2"
                : block.value.columns === "3"
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                : block.value.columns === "4"
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
                : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {block.value.cards?.map((card: any, idx: number) => {
              const cardData = card.card_content || card;
              const title = card.custom_title || cardData.title || "";
              const description =
                card.custom_description || cardData.description || "";
              const icon = card.card_icon || cardData.icon || "";
              const image = card.card_image || cardData.card_image;
              const background =
                card.card_background || cardData.card_background;
              const features = cardData.features || [];

              const formatDescription = (desc: string) => {
                if (!desc) return null;
                const lines = desc.split(/\r?\n/).filter((line) => line.trim());
                return lines.map((line, i) => {
                  const trimmed = line.trim();
                  const isBullet =
                    trimmed.length < 80 &&
                    !trimmed.endsWith(":") &&
                    (i > 0 || lines.length > 2);
                  if (isBullet) {
                    return (
                      <li key={i} className="flex items-start gap-2 mb-2">
                        <span className="text-blue-600 mt-1 font-bold">•</span>
                        <span className="flex-1">{trimmed}</span>
                      </li>
                    );
                  }
                  return (
                    <p key={i} className="mb-3 font-medium text-slate-700">
                      {trimmed}
                    </p>
                  );
                });
              };

              const bgColors = [
                "from-blue-50 to-indigo-50",
                "from-emerald-50 to-green-50",
                "from-orange-50 to-red-50",
                "from-purple-50 to-pink-50",
                "from-cyan-50 to-teal-50",
                "from-amber-50 to-yellow-50",
              ];
              const bgClass = background ? "" : bgColors[idx % bgColors.length];

              return (
                <ScrollAnimateCard
                  key={idx}
                  bgClass={bgClass}
                  cardData={{
                    ...cardData,
                    card_image: image,
                    card_background: background,
                  }}
                  title={title}
                  description={description}
                  icon={icon}
                  features={features}
                  formatDescription={formatDescription}
                />
              );
            })}
          </div>
        </div>
      );

    case "dynamic_list":
      const dynamicListData = block.value || {};
      return (
        <section className="py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 via-white to-slate-50">
          <div className="max-w-7xl mx-auto text-center">
            <div className="space-y-6 mb-20">
              {dynamicListData.heading && (
                <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900">
                  {dynamicListData.heading}
                </h2>
              )}
              {dynamicListData.description && (
                <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto font-medium">
                  {dynamicListData.description}
                </p>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.isArray(dynamicListData.items) &&
                dynamicListData.items.map((item: any, idx: number) => {
                  if (!item || typeof item !== "object") return null;
                  return (
                    <div key={idx} className="group">
                      <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 border-2 border-slate-200 hover:border-blue-300">
                        <div className="flex flex-col items-center text-center space-y-4">
                          {item.image && item.image.url && (
                            <img
                              src={getFullImageUrl(item.image.url)}
                              alt={item.image.title || item.title}
                              className="w-full h-52 object-cover rounded-xl border-2 border-white shadow-lg"
                            />
                          )}
                          <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                            {item.title}
                          </h3>
                          <div
                            className="text-slate-600 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: item.content }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </section>
      );

    case "dynamic_list_old":
      const dynamicListOldData = block.value || {};
      return (
        <div className="mb-20">
          {dynamicListOldData.heading && (
            <h3 className="text-4xl md:text-5xl font-extrabold mb-6 text-center text-slate-900">
              {dynamicListOldData.heading}
            </h3>
          )}
          {dynamicListOldData.description && (
            <p className="text-slate-600 mb-12 text-xl leading-relaxed text-center max-w-3xl mx-auto font-medium">
              {dynamicListOldData.description}
            </p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.isArray(dynamicListOldData.items) &&
              dynamicListOldData.items.map((item: any, idx: number) => {
                if (!item || typeof item !== "object") return null;
                return (
                  <div
                    key={idx}
                    className="relative h-80 rounded-2xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-shadow duration-500"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-600 translate-x-full translate-y-full group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500 ease-out origin-bottom-right" />
                    {item.image && item.image.url && (
                      <div className="absolute inset-0">
                        <img
                          src={getFullImageUrl(item.image.url)}
                          alt={item.image.title || item.title || "Card image"}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/70"></div>
                      </div>
                    )}
                    <div className="relative h-full flex flex-col justify-end p-6 text-white">
                      <h4 className="text-2xl font-extrabold mb-2 drop-shadow-lg text-white">
                        {item.title || "Untitled"}
                      </h4>
                      <p className="text-lg opacity-90 drop-shadow font-medium">
                        {item.subtitle || "2025"}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      );

    case "old_dynamic_list":
      const oldDynamicListData = block.value || {};
      return (
        <div className="mb-20">
          {oldDynamicListData.heading && (
            <h3 className="text-4xl md:text-5xl font-extrabold mb-6 text-slate-900">
              {oldDynamicListData.heading}
            </h3>
          )}
          {oldDynamicListData.description && (
            <p className="text-slate-600 mb-12 text-xl leading-relaxed font-medium">
              {oldDynamicListData.description}
            </p>
          )}
          <div className="space-y-8">
            {Array.isArray(oldDynamicListData.items) &&
              oldDynamicListData.items.map((item: any, idx: number) => {
                if (!item || typeof item !== "object") return null;
                const itemType = item.type || "";
                const itemValue = item.value || {};
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl p-10 hover:shadow-2xl transition-all duration-500 border-2 border-slate-200 hover:border-blue-300"
                  >
                    {itemType === "custom_item" && (
                      <>
                        {itemValue.icon && (
                          <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
                            <EasyIcon
                              icon={itemValue.icon}
                              size={28}
                              color="#FFFFFF"
                            />
                          </div>
                        )}
                        <h4 className="text-3xl font-extrabold mb-5 text-slate-900">
                          {itemValue.title || "Untitled"}
                        </h4>
                        {itemValue.content && (
                          <div
                            className="prose prose-lg max-w-none mb-6 text-slate-700"
                            dangerouslySetInnerHTML={{
                              __html:
                                typeof itemValue.content === "string"
                                  ? itemValue.content
                                  : String(itemValue.content || ""),
                            }}
                          />
                        )}
                        {itemValue.image && itemValue.image.url && (
                          <img
                            src={getFullImageUrl(itemValue.image.url)}
                            alt={itemValue.image.title || "Content image"}
                            className="mt-6 rounded-xl w-full object-cover max-h-96 shadow-xl border-4 border-white"
                          />
                        )}
                      </>
                    )}
                    {itemType === "feature" && (
                      <>
                        {itemValue.icon && (
                          <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
                            <EasyIcon
                              icon={itemValue.icon}
                              size={28}
                              color="#FFFFFF"
                            />
                          </div>
                        )}
                        <h4 className="text-3xl font-extrabold mb-5 text-slate-900">
                          {itemValue.title || "Feature"}
                        </h4>
                        {itemValue.description && (
                          <p className="text-slate-600 text-lg leading-relaxed font-medium">
                            {itemValue.description}
                          </p>
                        )}
                      </>
                    )}
                    {itemType === "benefit" && (
                      <>
                        {itemValue.icon && (
                          <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 bg-gradient-to-br from-emerald-500 to-green-600 shadow-lg">
                            <EasyIcon
                              icon={itemValue.icon}
                              size={28}
                              color="#FFFFFF"
                            />
                          </div>
                        )}
                        <h4 className="text-3xl font-extrabold mb-5 text-slate-900">
                          {itemValue.title || "Benefit"}
                        </h4>
                        {itemValue.description && (
                          <p className="text-slate-600 text-lg leading-relaxed font-medium">
                            {itemValue.description}
                          </p>
                        )}
                        {itemValue.stat && (
                          <div className="mt-6 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200">
                            <p className="text-3xl font-extrabold text-slate-900">
                              {itemValue.stat}
                            </p>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      );

    default:
      return null;
  }
};

export default DynamicContentRenderer;
