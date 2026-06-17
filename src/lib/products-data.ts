import type { ProductPageData } from "@/components/products/ProductPageContent";

export const PRODUCT_DATA: Record<string, ProductPageData> = {
  "tic-tac-toe-disappear": {
    name: "Tic-Tac-Toe",
    icon: "🎮",
    category: "Games",
    status: "live",
    tagline: "Vanishing-move strategy game.",
    description:
      "A strategic twist on the classic game where moves vanish after a set number of turns. Think ahead, adapt fast, and outmaneuver your opponent in this dynamic battlefield.",
    features: [
      {
        title: "Dynamic Board",
        desc: "Marks disappear after 3 turns, creating an evolving strategy.",
      },
      {
        title: "Multiple Modes",
        desc: "Solo against AI, local 2-player, or online challenges.",
      },
      {
        title: "Clean Design",
        desc: "Minimalist interface focused on gameplay.",
      },
    ],
    href: "/products",
  },
  qart: {
    name: "QArt",
    icon: "📱",
    category: "Marketing",
    status: "soon",
    tagline: "AI-generated QR codes that look like art.",
    description:
      "Transform any QR code into stunning visual art. AI-powered design generation while maintaining 100% scannability. Perfect for brands and marketing.",
    features: [
      {
        title: "AI Art Generation",
        desc: "Our AI creates unique, beautiful QR codes.",
      },
      {
        title: "100% Scannable",
        desc: "Every QR maintains full functionality.",
      },
      {
        title: "Brand Customization",
        desc: "Match your brand colors and styles.",
      },
    ],
    href: "/products",
  },
  financehub: {
    name: "FinanceHub",
    icon: "📈",
    category: "Finance",
    status: "paused",
    tagline: "Market data & portfolio monitoring.",
    description:
      "Market data and portfolio monitoring. Real-time tracking, alerts, and analytics for informed investment decisions.",
    features: [
      { title: "Real-time Data", desc: "Live market prices and portfolio value." },
      { title: "Alerts", desc: "Custom notifications for price movements." },
      { title: "Analytics", desc: "Performance metrics and insights." },
    ],
    href: "/products",
  },
  pickstracker: {
    name: "PicksTracker",
    icon: "🏆",
    category: "Sports",
    status: "roadmap",
    tagline: "Sports pick tracking with social predictions.",
    description:
      "Track your sports bets, share predictions with friends, and learn from winners. Social sports betting analytics.",
    features: [
      { title: "Pick Tracking", desc: "Track all your sports predictions." },
      { title: "Social Feed", desc: "Follow other successful predictors." },
      { title: "Analytics", desc: "Win rate tracking and ROI metrics." },
    ],
    href: "/products",
  },
  linkup: {
    name: "LinkUp",
    icon: "🔗",
    category: "Social",
    status: "paused",
    tagline: "Short-video professional matching.",
    description:
      "Short-video professional matching. Connect with peers, showcase expertise, and grow your professional network through video.",
    features: [
      { title: "Video Profiles", desc: "Short video introductions." },
      { title: "Smart Matching", desc: "AI-powered professional connections." },
      { title: "Network Growth", desc: "Tools to expand your reach." },
    ],
    href: "/products",
  },
  onetomany: {
    name: "OneToMany",
    icon: "🎯",
    category: "Productivity",
    status: "paused",
    tagline: "Goal setting & habit tracking.",
    description:
      "Goal setting and habit tracking. Break big goals into actionable steps. Build consistency with daily habits.",
    features: [
      {
        title: "Goal Breakdown",
        desc: "Split big goals into manageable tasks.",
      },
      { title: "Habit Tracking", desc: "Daily habits with streak tracking." },
      { title: "Progress Analytics", desc: "Visualize your journey." },
    ],
    href: "/products",
  },
  opengovern: {
    name: "OpenGovern",
    icon: "🏛️",
    category: "Civic Tech",
    status: "roadmap",
    tagline: "Direct democracy tooling.",
    description:
      "Direct democracy tooling for municipalities. Citizen engagement, transparent voting, and policy-making tools.",
    features: [
      {
        title: "Citizen Engagement",
        desc: "Platform for public participation.",
      },
      {
        title: "Transparent Voting",
        desc: "Verifiable, open voting system.",
      },
      { title: "Policy Making", desc: "Tools for collaborative governance." },
    ],
    href: "/products",
  },
};
