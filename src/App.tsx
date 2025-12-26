import { useState, useEffect } from "react";
import LandingPage from "./pages/LandingPage";
import { FeaturesPage } from "./components/features/features-page/FeaturesPage";
import { BlogPage } from "./components/blogs/BlogPage";
import AboutPage from "./pages/AboutPage";
import DebugFeaturesAPI from "./pages/DebugFeaturesApi";
import DebugLandingAPI from "./pages/DebugLandingApi";
import Maverick from "./components/salespage/Maverick";
import ImageGallery from "./components/gallery/ImageGallery";
import { ThemeProvider } from "./contexts/ThemeContext";
import { SiteSettingsProvider } from "./contexts/SiteSettingsContext";
import { DynamicHead } from "./components/DynamicHead";

function AppContent() {
  const [currentView, setCurrentView] = useState<{
    type: "landing" | "features" | "blog" | "about" | "debug-features" | "debug-landing" | "salespage" | "gallery";
    slug?: string;
  }>({ type: "landing" });

  useEffect(() => {
    const checkRoute = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;

      if (
        path.includes("/debug-features") ||
        hash.includes("#debug-features")
      ) {
        setCurrentView({ type: "debug-features" });
        return;
      }

      if (path.includes("/debug-landing") || hash.includes("#debug-landing")) {
        setCurrentView({ type: "debug-landing" });
        return;
      }

      if (path.includes("/debug") || hash.includes("#debug")) {
        setCurrentView({ type: "debug-features" });
        return;
      }

      if (path.includes("/blog/") || hash.includes("#blog/")) {
        const slugMatch =
          path.match(/\/blog\/([^\/]+)/) || hash.match(/#blog\/([^\/]+)/);

        if (slugMatch && slugMatch[1]) {
          setCurrentView({ type: "blog", slug: slugMatch[1] });
        } else {
          setCurrentView({ type: "blog" });
        }
        return;
      }

      if (path.includes("/blog") || hash.includes("#blog")) {
        setCurrentView({ type: "blog" });
        return;
      }

      if (path.includes("/about") || hash.includes("#about")) {
        setCurrentView({ type: "about" });
        return;
      }

      if (path.includes("/salespage") || hash.includes("#salespage")) {
        setCurrentView({ type: "salespage" });
        return;
      }

      if (path.includes("/gallery") || hash.includes("#gallery")) {
        setCurrentView({ type: "gallery" });
        return;
      }

      if (path.includes("/features/") || hash.includes("#features/")) {
        const slugMatch =
          path.match(/\/features\/([^\/]+)/) ||
          hash.match(/#features\/([^\/]+)/);

        if (slugMatch && slugMatch[1]) {
          setCurrentView({ type: "features", slug: slugMatch[1] });
        } else {
          setCurrentView({ type: "features", slug: "sales-marketing" });
        }
        return;
      }

      setCurrentView({ type: "landing" });
    };

    checkRoute();

    window.addEventListener("hashchange", checkRoute);
    window.addEventListener("popstate", checkRoute);

    return () => {
      window.removeEventListener("hashchange", checkRoute);
      window.removeEventListener("popstate", checkRoute);
    };
  }, []);

  if (currentView.type === "blog") {
    return (
      <>
        <ThemeProvider>
          <BlogPage slug={currentView.slug} />
        </ThemeProvider>
      </>
    );
  }

  if (currentView.type === "features") {
    return (
      <>
        <ThemeProvider>
          <FeaturesPage slug={currentView.slug} />
        </ThemeProvider>
      </>
    );
  }

  if (currentView.type === "debug-features") {
    return (
      <>
        <ThemeProvider>
          <DebugFeaturesAPI />
        </ThemeProvider>
      </>
    );
  }

  if (currentView.type === "debug-landing") {
    return (
      <>
        <ThemeProvider>
          <DebugLandingAPI />
        </ThemeProvider>
      </>
    );
  }

  if (currentView.type === "about") {
    return (
      <>
        <ThemeProvider>
          <AboutPage />
        </ThemeProvider>
      </>
    );
  }

  if (currentView.type === "salespage") {
    return (
      <>
        <ThemeProvider>
          <Maverick />
        </ThemeProvider>
      </>
    );
  }

  if (currentView.type === "gallery") {
    return (
      <>
        <ThemeProvider>
          <ImageGallery />
        </ThemeProvider>
      </>
    );
  }

  return (
    <>
      <ThemeProvider>
        <LandingPage />
      </ThemeProvider>
    </>
  );
}

function App() {
  return (
    <SiteSettingsProvider>
      <DynamicHead />
      <AppContent />
    </SiteSettingsProvider>
  );
}

export default App;
