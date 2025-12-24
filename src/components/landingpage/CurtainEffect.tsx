/**
 * Realistic Curtain Opening Effect - React Component
 *
 * This component creates a theatrical curtain opening animation
 * that can be used as a page reveal effect.
 *
 * Usage:
 * 1. Import this component into your LandingPage
 * 2. Replace your existing curtain JSX with this component
 * 3. Pass the `isOpen` prop to control when curtains open
 */

import React, { useEffect, useState, useMemo } from "react";

interface CurtainEffectProps {
  isOpen: boolean;
  onAnimationComplete?: () => void;
  curtainColor?: "red" | "blue" | "green" | "purple" | "gold";
}

const CurtainEffect: React.FC<CurtainEffectProps> = ({
  isOpen,
  onAnimationComplete,
  curtainColor = "red",
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  // Color themes for curtains
  const colorThemes = {
    red: {
      primary: "#8B1538",
      dark: "#2B0916",
      gradient: `linear-gradient(180deg,
        #8B1538 0%,
        #7B1333 10%,
        #6B112E 30%,
        #5B0F28 50%,
        #4B0D22 70%,
        #3B0B1C 90%,
        #2B0916 100%
      )`,
    },
    blue: {
      primary: "#1e3a5f",
      dark: "#0a1929",
      gradient: `linear-gradient(180deg,
        #2563eb 0%,
        #1d4ed8 10%,
        #1e40af 30%,
        #1e3a8a 50%,
        #172554 70%,
        #0f172a 90%,
        #020617 100%
      )`,
    },
    green: {
      primary: "#065f46",
      dark: "#022c22",
      gradient: `linear-gradient(180deg,
        #059669 0%,
        #047857 10%,
        #065f46 30%,
        #064e3b 50%,
        #022c22 70%,
        #052e16 90%,
        #14532d 100%
      )`,
    },
    purple: {
      primary: "#581c87",
      dark: "#2e1065",
      gradient: `linear-gradient(180deg,
        #7c3aed 0%,
        #6d28d9 10%,
        #5b21b6 30%,
        #4c1d95 50%,
        #3b0764 70%,
        #2e1065 90%,
        #1e1b4b 100%
      )`,
    },
    gold: {
      primary: "#b45309",
      dark: "#451a03",
      gradient: `linear-gradient(180deg,
        #f59e0b 0%,
        #d97706 10%,
        #b45309 30%,
        #92400e 50%,
        #78350f 70%,
        #451a03 90%,
        #27170a 100%
      )`,
    },
  };

  const theme = colorThemes[curtainColor];

  // Generate ring count based on screen width
  const ringCount = useMemo(() => {
    if (typeof window === "undefined") return 20;
    return window.innerWidth < 768 ? 15 : 25;
  }, []);

  useEffect(() => {
    if (isOpen && !isAnimating) {
      setIsAnimating(true);

      // After animation completes, optionally hide the curtain DOM
      const timer = setTimeout(() => {
        setShouldRender(false);
        onAnimationComplete?.();
      }, 4000); // 3.5s animation + 0.5s buffer

      return () => clearTimeout(timer);
    }
  }, [isOpen, isAnimating, onAnimationComplete]);

  // Reset when isOpen becomes false (for replay functionality)
  useEffect(() => {
    if (!isOpen) {
      setShouldRender(true);
      setIsAnimating(false);
    }
  }, [isOpen]);

  if (!shouldRender) return null;

  return (
    <>
      {/* CSS Styles */}
      <style>{`
        .curtain-container {
          position: fixed;
          inset: 0;
          z-index: 9999;
          pointer-events: none;
          perspective: 1500px;
          opacity: ${isAnimating ? '1' : '1'};
          transition: opacity 0.5s ease-out 3.5s;
        }

        .curtain-container.hiding {
          opacity: 0;
        }

        .curtain-rod {
          position: absolute;
          top: 0;
          left: -20px;
          right: -20px;
          height: 50px;
          background: linear-gradient(180deg, 
            #d4a574 0%, 
            #c9956a 15%,
            #b8845a 30%,
            #8b6b4a 50%,
            #6b5038 70%,
            #4a3828 100%
          );
          z-index: 100;
          box-shadow: 
            0 8px 30px rgba(0,0,0,0.6),
            inset 0 2px 4px rgba(255,255,255,0.3),
            inset 0 -3px 6px rgba(0,0,0,0.4);
          border-radius: 0 0 3px 3px;
          animation: rodSettle 0.5s ease-out forwards;
          animation-delay: 0.3s;
        }

        .curtain-rod::before {
          content: '';
          position: absolute;
          top: 5px;
          left: 50px;
          right: 50px;
          height: 8px;
          background: linear-gradient(90deg, 
            transparent 0%,
            rgba(255,220,180,0.5) 20%,
            rgba(255,220,180,0.8) 50%,
            rgba(255,220,180,0.5) 80%,
            transparent 100%
          );
          border-radius: 50%;
        }

        .finial {
          position: absolute;
          top: -15px;
          width: 60px;
          height: 80px;
          background: linear-gradient(135deg, #d4a574 0%, #8b6b4a 50%, #4a3828 100%);
          border-radius: 50% 50% 45% 45%;
          z-index: 101;
          box-shadow: 
            0 5px 20px rgba(0,0,0,0.5),
            inset 0 -10px 20px rgba(0,0,0,0.3),
            inset 0 5px 10px rgba(255,220,180,0.4);
        }

        .finial.left { left: 0; }
        .finial.right { right: 0; }

        .finial::after {
          content: '';
          position: absolute;
          top: 10px;
          left: 50%;
          transform: translateX(-50%);
          width: 30px;
          height: 30px;
          background: radial-gradient(circle at 30% 30%, #d4a574, #6b5038);
          border-radius: 50%;
          box-shadow: inset 0 -5px 10px rgba(0,0,0,0.3);
        }

        .curtain-rings {
          position: absolute;
          top: 35px;
          left: 60px;
          right: 60px;
          height: 30px;
          display: flex;
          justify-content: space-between;
          z-index: 99;
        }

        .ring {
          width: 20px;
          height: 20px;
          background: linear-gradient(135deg, #c9956a 0%, #6b5038 100%);
          border-radius: 50%;
          box-shadow: 
            0 2px 5px rgba(0,0,0,0.4),
            inset 0 1px 2px rgba(255,255,255,0.3);
        }

        .rod-shadow {
          position: absolute;
          top: 50px;
          left: 0;
          right: 0;
          height: 30px;
          background: linear-gradient(180deg, rgba(0,0,0,0.4) 0%, transparent 100%);
          z-index: 98;
        }

        .curtain {
          position: absolute;
          top: 45px;
          bottom: 0;
          width: 55%;
          overflow: hidden;
          transform-origin: top;
          will-change: transform;
        }

        .curtain-left {
          left: 0;
          transform: translateX(0) rotateY(0deg);
        }

        .curtain-left.opening {
          animation: curtainOpenLeft 3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          animation-delay: 0.5s;
        }

        .curtain-right {
          right: 0;
          transform: translateX(0) rotateY(0deg);
        }

        .curtain-right.opening {
          animation: curtainOpenRight 3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          animation-delay: 0.5s;
        }

        .curtain-band {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 30px;
          background: linear-gradient(180deg,
            #d4a574 0%,
            #c9956a 30%,
            #8b6b4a 70%,
            #6b5038 100%
          );
          box-shadow: 0 3px 10px rgba(0,0,0,0.3);
          z-index: 5;
        }

        .curtain-band::before {
          content: '';
          position: absolute;
          top: 5px;
          left: 10%;
          right: 10%;
          height: 4px;
          background: linear-gradient(90deg,
            transparent,
            rgba(255,220,180,0.6) 20%,
            rgba(255,220,180,0.8) 50%,
            rgba(255,220,180,0.6) 80%,
            transparent
          );
          border-radius: 2px;
        }

        .curtain-fabric {
          position: absolute;
          inset: 0;
          top: 30px;
        }

        .curtain-fabric::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: 
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(0,0,0,0.03) 2px,
              rgba(0,0,0,0.03) 4px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 1px,
              rgba(255,255,255,0.02) 1px,
              rgba(255,255,255,0.02) 2px
            );
          pointer-events: none;
        }

        .curtain-fabric.animating {
          animation: fabricSway 3s ease-in-out forwards;
          animation-delay: 0.5s;
        }

        .curtain-folds {
          position: absolute;
          inset: 0;
          display: flex;
        }

        .fold {
          flex: 1;
          position: relative;
          background: linear-gradient(90deg,
            rgba(0,0,0,0.3) 0%,
            rgba(255,255,255,0.1) 15%,
            rgba(0,0,0,0.15) 30%,
            rgba(255,255,255,0.08) 45%,
            rgba(0,0,0,0.25) 60%,
            rgba(255,255,255,0.05) 75%,
            rgba(0,0,0,0.35) 100%
          );
        }

        .fold::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg,
            rgba(255,255,255,0.15) 0%,
            transparent 20%,
            transparent 80%,
            rgba(0,0,0,0.2) 100%
          );
        }

        .fold:nth-child(odd) {
          background: linear-gradient(90deg,
            rgba(255,255,255,0.08) 0%,
            rgba(0,0,0,0.2) 30%,
            rgba(255,255,255,0.1) 50%,
            rgba(0,0,0,0.3) 70%,
            rgba(255,255,255,0.05) 100%
          );
        }

        .curtain-left .edge-shadow {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          width: 80px;
          background: linear-gradient(90deg, transparent, rgba(0,0,0,0.6));
          pointer-events: none;
        }

        .curtain-right .edge-shadow {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          width: 80px;
          background: linear-gradient(270deg, transparent, rgba(0,0,0,0.6));
          pointer-events: none;
        }

        .curtain-fringe {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 40px;
          background: linear-gradient(180deg,
            transparent 0%,
            #d4a574 20%,
            #c9956a 40%,
            #b8845a 60%,
            #a87550 80%,
            #987040 100%
          );
          mask-image: repeating-linear-gradient(
            90deg,
            transparent 0px,
            transparent 2px,
            black 2px,
            black 8px
          );
          -webkit-mask-image: repeating-linear-gradient(
            90deg,
            transparent 0px,
            transparent 2px,
            black 2px,
            black 8px
          );
        }

        .stage-lighting {
          position: fixed;
          inset: 0;
          background: radial-gradient(
            ellipse 100% 100% at 50% 0%,
            rgba(255,200,100,0.15) 0%,
            transparent 50%
          );
          z-index: 9998;
          pointer-events: none;
          opacity: 0;
        }

        .stage-lighting.active {
          animation: lightingFadeIn 2s ease-out forwards;
          animation-delay: 1.5s;
        }

        @keyframes curtainOpenLeft {
          0% { transform: translateX(0) rotateY(0deg) scaleX(1); }
          5% { transform: translateX(2%) rotateY(-2deg) scaleX(1.02); }
          15% { transform: translateX(-5%) rotateY(3deg) scaleX(1.01); }
          30% { transform: translateX(-30%) rotateY(-5deg) scaleX(0.98); }
          50% { transform: translateX(-60%) rotateY(8deg) scaleX(0.95); }
          70% { transform: translateX(-85%) rotateY(-3deg) scaleX(0.9); }
          85% { transform: translateX(-100%) rotateY(5deg) scaleX(0.85); }
          95% { transform: translateX(-103%) rotateY(-2deg) scaleX(0.82); }
          100% { transform: translateX(-100%) rotateY(0deg) scaleX(0.8); }
        }

        @keyframes curtainOpenRight {
          0% { transform: translateX(0) rotateY(0deg) scaleX(1); }
          5% { transform: translateX(-2%) rotateY(2deg) scaleX(1.02); }
          15% { transform: translateX(5%) rotateY(-3deg) scaleX(1.01); }
          30% { transform: translateX(30%) rotateY(5deg) scaleX(0.98); }
          50% { transform: translateX(60%) rotateY(-8deg) scaleX(0.95); }
          70% { transform: translateX(85%) rotateY(3deg) scaleX(0.9); }
          85% { transform: translateX(100%) rotateY(-5deg) scaleX(0.85); }
          95% { transform: translateX(103%) rotateY(2deg) scaleX(0.82); }
          100% { transform: translateX(100%) rotateY(0deg) scaleX(0.8); }
        }

        @keyframes fabricSway {
          0%, 100% { transform: skewX(0deg); }
          20% { transform: skewX(2deg); }
          40% { transform: skewX(-3deg); }
          60% { transform: skewX(2deg); }
          80% { transform: skewX(-1deg); }
        }

        @keyframes rodSettle {
          0% { transform: translateY(-5px); }
          50% { transform: translateY(2px); }
          100% { transform: translateY(0); }
        }

        @keyframes lightingFadeIn {
          to { opacity: 1; }
        }

        @media (max-width: 768px) {
          .finial { width: 40px; height: 60px; }
          .curtain-rod { height: 40px; }
          .curtain { top: 35px; }
          .curtain-rings { top: 28px; }
          .ring { width: 15px; height: 15px; }
        }
      `}</style>

      {/* Stage Lighting */}
      <div className={`stage-lighting ${isOpen ? "active" : ""}`} />

      {/* Curtain Container */}
      <div className={`curtain-container ${isAnimating ? 'hiding' : ''}`}>
        {/* Decorative Finials */}
        <div className="finial left" />
        <div className="finial right" />

        {/* Curtain Rod */}
        <div className="curtain-rod" />

        {/* Rod Shadow */}
        <div className="rod-shadow" />

        {/* Curtain Rings */}
        <div className="curtain-rings">
          {Array.from({ length: ringCount }).map((_, i) => (
            <div key={i} className="ring" />
          ))}
        </div>

        {/* Left Curtain */}
        <div className={`curtain curtain-left ${isOpen ? "opening" : ""}`}>
          <div className="curtain-band" />
          <div
            className={`curtain-fabric ${isOpen ? "animating" : ""}`}
            style={{ background: theme.gradient }}
          >
            <div className="curtain-folds">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="fold" />
              ))}
            </div>
          </div>
          <div className="edge-shadow" />
          <div className="curtain-fringe" />
        </div>

        {/* Right Curtain */}
        <div className={`curtain curtain-right ${isOpen ? "opening" : ""}`}>
          <div className="curtain-band" />
          <div
            className={`curtain-fabric ${isOpen ? "animating" : ""}`}
            style={{ background: theme.gradient }}
          >
            <div className="curtain-folds">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="fold" />
              ))}
            </div>
          </div>
          <div className="edge-shadow" />
          <div className="curtain-fringe" />
        </div>
      </div>
    </>
  );
};

export default CurtainEffect;

/**
 * ===========================================
 * INTEGRATION EXAMPLE FOR YOUR LANDING PAGE
 * ===========================================
 *
 * In your LandingPage.tsx, replace the curtain section with:
 *
 * 1. Import the component:
 *    import CurtainEffect from '../components/CurtainEffect';
 *
 * 2. In your return statement, replace the curtain JSX:
 *
 *    <CurtainEffect
 *      isOpen={!showCurtain}  // Your existing state
 *      curtainColor="red"     // Optional: 'red' | 'blue' | 'green' | 'purple' | 'gold'
 *      onAnimationComplete={() => console.log('Curtains fully opened!')}
 *    />
 *
 * 3. The component handles all the animation timing internally
 *
 * 4. Your existing showCurtain state logic remains the same:
 *    - Set to true initially
 *    - After data loads: setTimeout(() => setShowCurtain(false), 1000);
 */
