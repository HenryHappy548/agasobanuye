// AdSense Configuration - Replace with your actual AdSense pub ID
export const ADSENSE_CONFIG = {
  // Replace this with your actual AdSense Publisher ID after approval
  PUB_ID: "ca-pub-xxxxxxxxxxxxxxxx",
  
  // Ad Slots - Replace with your actual ad slot IDs from AdSense
  AD_SLOTS: {
    BANNER_TOP: "1234567890",      // 728x90 or responsive
    BANNER_BOTTOM: "1234567891",   // 728x90 or responsive
    RECTANGLE_SIDEBAR: "1234567892", // 300x250
    IN_ARTICLE: "1234567893",       // Responsive in-content
    MOBILE_BANNER: "1234567894",    // 320x100 mobile
    FOOTER: "1234567895",           // 728x90 footer
  },
  
  // Delay settings (in milliseconds)
  AD_DELAYS: {
    INITIAL_LOAD: 2000,
    IN_ARTICLE_DELAY: 5000,
    FOOTER_DELAY: 1000,
  }
};

export default ADSENSE_CONFIG;