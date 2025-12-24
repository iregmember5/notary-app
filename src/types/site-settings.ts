export interface SiteSettings {
  favicon?: string;
  siteTitle?: string;
}

export interface SiteSettingsResponse {
  favicon?: {
    url: string;
    alt?: string;
  };
  site_title?: string;
}