// App.tsx
import { useState, useEffect } from "react";
import LandingPage from "./pages/LandingPage";
import { FeaturesPage } from "./components/features/features-page/FeaturesPage";
import { BlogPage } from "./components/blogs/BlogPage";
import DebugFeaturesAPI from "./pages/DebugFeaturesApi";
import DebugLandingAPI from "./pages/DebugLandingApi";
import Maverick from "./components/salespage/MaverickClean";
import { ThemeProvider } from "./contexts/ThemeContext";
import { SiteSettingsProvider } from "./contexts/SiteSettingsContext";
import { DynamicHead } from "./components/DynamicHead";

function App() {
  const [currentView, setCurrentView] = useState<{
    type: "landing" | "features" | "blog" | "debug-features" | "debug-landing" | "salespage";
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

      if (path.includes("/salespage") || hash.includes("#salespage")) {
        setCurrentView({ type: "salespage" });
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

      // Default to landing page
      setCurrentView({ type: "landing" });
    };

    checkRoute();

    // Listen for hash changes (for navigation without page reload)
    window.addEventListener("hashchange", checkRoute);
    window.addEventListener("popstate", checkRoute);

    return () => {
      window.removeEventListener("hashchange", checkRoute);
      window.removeEventListener("popstate", checkRoute);
    };
  }, []);

  // Render based on current view
  if (currentView.type === "blog") {
    return (
      <SiteSettingsProvider>
        <DynamicHead />
        <ThemeProvider>
          <BlogPage slug={currentView.slug} />
        </ThemeProvider>
      </SiteSettingsProvider>
    );
  }

  if (currentView.type === "features") {
    return (
      <SiteSettingsProvider>
        <DynamicHead />
        <ThemeProvider>
          <FeaturesPage slug={currentView.slug} />
        </ThemeProvider>
      </SiteSettingsProvider>
    );
  }

  if (currentView.type === "debug-features") {
    return (
      <SiteSettingsProvider>
        <DynamicHead />
        <ThemeProvider>
          <DebugFeaturesAPI />
        </ThemeProvider>
      </SiteSettingsProvider>
    );
  }

  if (currentView.type === "debug-landing") {
    return (
      <SiteSettingsProvider>
        <DynamicHead />
        <ThemeProvider>
          <DebugLandingAPI />
        </ThemeProvider>
      </SiteSettingsProvider>
    );
  }

  if (currentView.type === "salespage") {
    return (
      <SiteSettingsProvider>
        <DynamicHead />
        <ThemeProvider>
          <Maverick />
        </ThemeProvider>
      </SiteSettingsProvider>
    );
  }

  return (
    <SiteSettingsProvider>
      <DynamicHead />
      <ThemeProvider>
        <LandingPage />
      </ThemeProvider>
    </SiteSettingsProvider>
  );
}

export default App;
