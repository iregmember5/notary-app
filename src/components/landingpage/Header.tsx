import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { LandingPageData } from "../../types/landing";
import EasyIcon from "./IconRenderer";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.4, 0.25, 1] as const,
    },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.8, x: 100 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      duration: 1,
      ease: [0.25, 0.4, 0.25, 1] as const,
    },
  },
};

interface HeaderProps {
  data: LandingPageData;
  onShowLogin?: () => void;
}

const Header: React.FC<HeaderProps> = ({ data, onShowLogin }) => {
  const {
    header_title,
    header_subtitle,
    header_description,
    header_cta_primary,
    header_cta_primary_url,
    header_cta_secondary,
    header_cta_secondary_url,
    header_section_image,
  } = data;

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });



  const backendBaseUrl = "https://esign-admin.signmary.com";

  const rightImageUrl = header_section_image?.url?.startsWith("http")
    ? header_section_image.url
    : header_section_image?.url
    ? `${backendBaseUrl}${header_section_image.url}`
    : null;

  const handleGetStartedClick = () => {
    if (onShowLogin) {
      onShowLogin();
    }
  };

  return (
    <header
      ref={ref}
      className="relative top-7 flex items-center justify-center overflow-hidden min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-blue-50/50"
    >
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => {
          const size = Math.random() * 40 + 20;
          const style = {
            width: `${size}px`,
            height: `${size}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          };
          return (
            <motion.div
              key={i}
              className="absolute opacity-10 pointer-events-none bg-blue-500 rounded-full"
              style={style}
              animate={{
                y: [-20, 20, -20],
                x: [-10, 10, -10],
                rotate: [0, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: Math.random() * 10 + 15,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: Math.random() * 5,
              }}
            />
          );
        })}
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          {/* Text Content - Left Side */}
          <div className="space-y-8 text-center md:text-left">
            <motion.div variants={itemVariants} className="space-y-6">
              {/* Top Badge */}
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-sm font-medium text-blue-500"
                whileHover={{ scale: 1.05 }}
              >
                <EasyIcon
                  icon="FiSmartphone"
                  size={14}
                  color="var(--color-primary)"
                  className="sm:w-4 sm:h-4"
                />
                <span className="text-xs sm:text-sm font-medium text-theme-primary">
                  {header_subtitle ||
                    "Add iOS 16 Passkeys to your website with OwnID"}
                </span>
              </motion.div>

              <div className="space-y-4">
                {/* Main Title */}
                {header_title && (
                  <motion.h3
                    className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
                    variants={itemVariants}
                  >
                    All-in-One Business{" "}
                    <motion.span
                      className="relative inline-block"
                      style={{ color: 'var(--color-primary)' }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      Automation Platform
                      <motion.div
                        className="absolute -inset-2 bg-blue-500/10 rounded-lg -z-10"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 1.5, duration: 0.5 }}
                      />
                    </motion.span>
                    {" "}by MyPowerly
                  </motion.h3>
                )}

                {/* Description */}
                {header_description && (
                  <motion.p
                    className="text-base md:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto md:mx-0"
                    variants={itemVariants}
                  >
                    {header_description}
                  </motion.p>
                )}
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex gap-4 justify-center md:justify-start"
            >
              {header_cta_primary && (
                <motion.div whileHover={{ scale: 1.10 }} whileTap={{ scale: 0.95 }}>
                  {header_cta_primary_url ? (
                    <a
                      href={header_cta_primary_url}
                      className="group flex items-center px-8 py-6 text-lg font-semibold text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 gradient-theme-primary"
                    >
                      <span>{header_cta_primary}</span>
                      <EasyIcon icon="FiArrowRight" size={20} color="#FFFFFF" className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </a>
                  ) : (
                    <button
                      onClick={handleGetStartedClick}
                      className="group flex items-center px-8 py-6 text-lg font-semibold text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 gradient-theme-primary"
                    >
                      <span>{header_cta_primary}</span>
                      <EasyIcon icon="FiArrowRight" size={20} color="#FFFFFF" className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>
                  )}
                </motion.div>
              )}

              {header_cta_secondary && (
                <motion.div whileHover={{ scale: 1.10 }} whileTap={{ scale: 0.95 }}>
                  {header_cta_secondary_url && header_cta_secondary_url !== "#login" ? (
                    <a
                      href={header_cta_secondary_url}
                      className="group flex items-center px-8 py-6 text-lg font-semibold text-gray-700 border-2 border-gray-300 hover:border-primary hover:text-primary hover:bg-blue-50 rounded-lg transition-all duration-300"
                    >
                      <EasyIcon icon="FiPlay" size={20} color="currentColor" className="mr-2 group-hover:scale-110 transition-transform" />
                      <span>{header_cta_secondary}</span>
                    </a>
                  ) : (
                    <button
                      onClick={onShowLogin}
                      className="group flex items-center px-8 py-6 text-lg font-semibold text-gray-700 border-2 border-gray-300 hover:border-primary hover:text-primary hover:bg-blue-50 rounded-lg transition-all duration-300"
                    >
                      <EasyIcon icon="FiPlay" size={20} color="currentColor" className="mr-2 group-hover:scale-110 transition-transform" />
                      <span>{header_cta_secondary}</span>
                    </button>
                  )}
                </motion.div>
              )}
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-4"
            >
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <motion.div
                  className="w-2 h-2 bg-green-500 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span>Free 14-day trial</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <motion.div
                  className="w-2 h-2 bg-green-500 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                />
                <span>No credit card required</span>
              </div>
            </motion.div>
          </div>

          {/* Image Section - Right Side */}
          <motion.div variants={imageVariants} className="relative">
            <div className="relative z-10">
              {rightImageUrl ? (
                <>
                  <motion.img
                    src={rightImageUrl}
                    alt="Business Automation Platform Dashboard"
                    className="w-full h-auto max-w-lg mx-auto rounded-2xl shadow-2xl"
                    whileHover={{ scale: 1.02, rotateY: 5, rotateX: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  />
                  {/* Floating decoration cards */}
                  <motion.div
                    className="absolute -top-6 -left-6 bg-white border border-gray-200 p-4 rounded-xl shadow-lg"
                    animate={{ y: [0, -10, 0], rotate: [-2, 2, -2] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <div className="text-sm font-medium text-gray-900">📧 Email Campaigns</div>
                    <div className="text-xs text-gray-600">+247% engagement</div>
                  </motion.div>
                  <motion.div
                    className="absolute -bottom-4 -right-4 bg-white border border-gray-200 p-4 rounded-xl shadow-lg"
                    animate={{ y: [0, 10, 0], rotate: [2, -2, 2] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  >
                    <div className="text-sm font-medium text-gray-900">🚀 AI Automation</div>
                    <div className="text-xs text-gray-600">Save 8+ hours/day</div>
                  </motion.div>
                </>
              ) : (
                <div className="w-full h-96 rounded-2xl bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">Image placeholder</span>
                </div>
              )}
            </div>
            {/* Background decoration */}
            <motion.div
              className="absolute top-8 -right-8 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute -bottom-8 -left-8 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl"
              animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            />
          </motion.div>
        </motion.div>
      </div>
    </header>
  );
};

export default Header;
