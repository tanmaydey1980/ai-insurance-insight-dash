
export interface KpiMetric {
  title: string;
  value: string | number;
  change: number;
  aiInsight?: string;
}

export interface Action {
  id: string;
  title: string;
  description: string;
  impact: number;
  effort: number;
  aiConfidence: number;
  tags: string[];
}

export interface CustomerSegment {
  id: string;
  name: string;
  size: number;
  traits: string[];
  conversion: number;
  aiRecommendation?: string;
}

export interface JourneyStep {
  id: string;
  name: string;
  conversion: number;
  dropoff: number;
  aiOptimization?: string;
  bottleneck: boolean;
}

export interface ContentItem {
  id: string;
  title: string;
  type: string;
  views: number;
  engagement: number;
  conversion: number;
  sentiment: number;
  aiTags: string[];
}

// KPI Metrics
export const kpiMetrics: KpiMetric[] = [
  {
    title: "Total Visitors",
    value: "24,892",
    change: 12.5,
    aiInsight: "23% increase in mobile traffic suggests optimizing mobile journey"
  },
  {
    title: "Conversion Rate",
    value: "3.2%",
    change: 0.8,
    aiInsight: "Higher conversions from personalized landing pages (+42%)"
  },
  {
    title: "Quote Requests",
    value: 796,
    change: 15.3,
    aiInsight: "Auto insurance quotes dominate (68%), opportunity in home insurance"
  },
  {
    title: "Cost per Acquisition",
    value: "$42.16",
    change: -8.7,
    aiInsight: "Retargeting campaigns show lowest CPA ($28.43)"
  }
];

// Next Best Actions
export const nextBestActions: Action[] = [
  {
    id: "nba-1",
    title: "Launch personalized email campaign to 'Almost Converted' segment",
    description: "Target 4,320 users who abandoned quote process in last 14 days with personalized incentives",
    impact: 85,
    effort: 30,
    aiConfidence: 92,
    tags: ["email", "high-intent", "personalization"]
  },
  {
    id: "nba-2",
    title: "Optimize mobile form UX on quote request page",
    description: "Simplify the multi-step form on mobile to reduce 42% abandonment rate",
    impact: 78,
    effort: 45,
    aiConfidence: 88,
    tags: ["mobile", "ux", "conversion"]
  },
  {
    id: "nba-3",
    title: "Create video content addressing top customer questions",
    description: "Develop short video answers to top 5 questions from chat analysis",
    impact: 65,
    effort: 60,
    aiConfidence: 76,
    tags: ["content", "video", "education"]
  },
  {
    id: "nba-4",
    title: "Launch retargeting campaign for homeowner segment",
    description: "Target existing auto insurance customers who are homeowners but don't have home insurance",
    impact: 82,
    effort: 40,
    aiConfidence: 94,
    tags: ["cross-sell", "retargeting", "home-insurance"]
  }
];

// Customer Journey Steps
export const journeySteps: JourneyStep[] = [
  {
    id: "step-1",
    name: "Landing Page View",
    conversion: 100,
    dropoff: 32,
    bottleneck: false
  },
  {
    id: "step-2",
    name: "Insurance Options",
    conversion: 68,
    dropoff: 15,
    bottleneck: false
  },
  {
    id: "step-3",
    name: "Quote Form",
    conversion: 53,
    dropoff: 28,
    aiOptimization: "Simplify form fields - 42% of users abandon due to length",
    bottleneck: true
  },
  {
    id: "step-4",
    name: "Quote Results",
    conversion: 25,
    dropoff: 12,
    bottleneck: false
  },
  {
    id: "step-5",
    name: "Plan Selection",
    conversion: 13,
    dropoff: 5,
    bottleneck: false
  },
  {
    id: "step-6",
    name: "Checkout",
    conversion: 8,
    dropoff: 5,
    aiOptimization: "Add trust signals - 68% of abandoners cited trust concerns",
    bottleneck: true
  },
  {
    id: "step-7",
    name: "Confirmation",
    conversion: 3,
    dropoff: 0,
    bottleneck: false
  }
];

// Audience Segments
export const audienceSegments: CustomerSegment[] = [
  {
    id: "seg-1",
    name: "Young Urban Professionals",
    size: 7843,
    traits: ["25-34", "Urban", "Tech-savvy", "Price-sensitive"],
    conversion: 2.8,
    aiRecommendation: "Target with mobile-friendly short-term coverage options and digital-first experience"
  },
  {
    id: "seg-2",
    name: "Suburban Families",
    size: 5621,
    traits: ["35-45", "Suburban", "Multi-policy potential", "Safety-focused"],
    conversion: 4.6,
    aiRecommendation: "Emphasize bundled policies and family protection messaging"
  },
  {
    id: "seg-3",
    name: "Pre-Retirees",
    size: 4215,
    traits: ["50-65", "High value assets", "Loyalty-focused", "Risk-averse"],
    conversion: 5.2,
    aiRecommendation: "Highlight premium coverage options and personalized advisory services"
  },
  {
    id: "seg-4",
    name: "First-Time Insurance Buyers",
    size: 3892,
    traits: ["18-28", "Budget-conscious", "Education-seeking", "Digital-native"],
    conversion: 1.9,
    aiRecommendation: "Provide educational content and basic coverage with growth options"
  },
  {
    id: "seg-5",
    name: "High-Net-Worth Individuals",
    size: 1254,
    traits: ["40-60", "Multiple assets", "Premium service expectations", "Privacy-focused"],
    conversion: 3.7,
    aiRecommendation: "Offer white-glove service and comprehensive coverage packages"
  }
];

// Content Performance
export const contentItems: ContentItem[] = [
  {
    id: "content-1",
    title: "Homeowner's Insurance Guide",
    type: "Article",
    views: 4872,
    engagement: 67,
    conversion: 3.2,
    sentiment: 0.8,
    aiTags: ["educational", "high-value", "trust-building"]
  },
  {
    id: "content-2",
    title: "Auto Insurance Quote Calculator",
    type: "Tool",
    views: 12546,
    engagement: 78,
    conversion: 5.8,
    sentiment: 0.6,
    aiTags: ["high-intent", "conversion-focused", "interactive"]
  },
  {
    id: "content-3",
    title: "Insurance for Millennials",
    type: "Blog Post",
    views: 3254,
    engagement: 45,
    conversion: 2.1,
    sentiment: 0.5,
    aiTags: ["demographic-targeted", "awareness", "educational"]
  },
  {
    id: "content-4",
    title: "How to Save on Auto Insurance",
    type: "Video",
    views: 2876,
    engagement: 72,
    conversion: 3.9,
    sentiment: 0.9,
    aiTags: ["high-value", "shareable", "problem-solving"]
  },
  {
    id: "content-5",
    title: "Insurance Terms Explained",
    type: "Infographic",
    views: 1589,
    engagement: 54,
    conversion: 1.7,
    sentiment: 0.7,
    aiTags: ["educational", "reference", "clarity"]
  }
];

// Behavioral Targeting Scenarios
export const behavioralScenarios = [
  {
    id: "scenario-1",
    name: "Cart Abandoners",
    description: "Users who started but didn't complete quote process",
    recommendedContent: "Simplified quote retrieval and limited-time incentive",
    conversionLift: "+42%"
  },
  {
    id: "scenario-2",
    name: "Repeat Information Seekers",
    description: "Multiple visits to information pages without conversion",
    recommendedContent: "FAQ video content and guided quote process",
    conversionLift: "+28%"
  },
  {
    id: "scenario-3",
    name: "Comparison Shoppers",
    description: "Users who view multiple plans and pricing pages",
    recommendedContent: "Side-by-side comparison tool with competitor analysis",
    conversionLift: "+35%"
  },
  {
    id: "scenario-4",
    name: "Researchers",
    description: "Long time-on-site visitors reading multiple articles",
    recommendedContent: "In-depth guides and expert consultation offer",
    conversionLift: "+19%"
  }
];
