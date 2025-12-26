// App.tsx
import { useState, useEffect } from "react";
import LandingPage from "./pages/LandingPage";
import { FeaturesPage } from "./components/features/features-page/FeaturesPage";
import { BlogPage } from "./components/blogs/BlogPage";
import DebugFeaturesAPI from "./pages/DebugFeaturesApi";
import DebugLandingAPI from "./pages/DebugLandingApi";
import Maverick from "./components/salespage/Maverick";
import { ThemeProvider } from "./contexts/ThemeContext";
import { SiteSettingsProvider, useSiteSettings } from "./contexts/SiteSettingsContext";
import { DynamicHead } from "./components/DynamicHead";
import WidgetButton from "./components/WidgetButton";

function AppContent() {
  const { settings } = useSiteSettings();
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
        <WidgetButton widgets={settings.widgets || []} />
      </>
    );
  }

  if (currentView.type === "features") {
    return (
      <>
        <ThemeProvider>
          <FeaturesPage slug={currentView.slug} />
        </ThemeProvider>
        <WidgetButton widgets={settings.widgets || []} />
      </>
    );
  }

  if (currentView.type === "debug-features") {
    return (
      <>
        <ThemeProvider>
          <DebugFeaturesAPI />
        </ThemeProvider>
        <WidgetButton widgets={settings.widgets || []} />
      </>
    );
  }

  if (currentView.type === "debug-landing") {
    return (
      <>
        <ThemeProvider>
          <DebugLandingAPI />
        </ThemeProvider>
        <WidgetButton widgets={settings.widgets || []} />
      </>
    );
  }

  if (currentView.type === "salespage") {
    return (
      <>
        <ThemeProvider>
          <Maverick />
        </ThemeProvider>
        <WidgetButton widgets={settings.widgets || []} />
      </>
    );
  }

  return (
    <>
      <ThemeProvider>
        <LandingPage />
      </ThemeProvider>
      <WidgetButton widgets={settings.widgets || []} />
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
