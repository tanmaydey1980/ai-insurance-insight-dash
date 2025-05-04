
// Data for channel performance metrics
export const channelData = [
  { channel: "Organic Search", conversion: 3.2, ctr: 4.8, cpa: 38, roas: 3.8 },
  { channel: "Paid Search", conversion: 2.7, ctr: 3.5, cpa: 45, roas: 2.9 },
  { channel: "Social Media", conversion: 1.8, ctr: 2.3, cpa: 52, roas: 2.2 },
  { channel: "Email", conversion: 4.2, ctr: 5.8, cpa: 28, roas: 4.5 },
  { channel: "Referral", conversion: 3.5, ctr: 3.9, cpa: 32, roas: 3.2 },
  { channel: "Direct", conversion: 3.0, ctr: 0, cpa: 35, roas: 3.0 },
];

// Data for top performing pages
export const topPerformingPages = [
  { 
    page: "Auto Insurance Landing Page", 
    channel: "Organic Search", 
    visitors: 12458, 
    conversion: 5.2,
    performance: "Excellent"
  },
  { 
    page: "Home Insurance Calculator", 
    channel: "Paid Search", 
    visitors: 8765, 
    conversion: 4.8,
    performance: "Excellent"
  },
  { 
    page: "Insurance Bundle Offers", 
    channel: "Email", 
    visitors: 6532, 
    conversion: 6.3,
    performance: "Excellent"
  },
  { 
    page: "Claims Process Guide", 
    channel: "Direct", 
    visitors: 5421, 
    conversion: 2.1,
    performance: "Average"
  },
  { 
    page: "Life Insurance Options", 
    channel: "Social Media", 
    visitors: 4876, 
    conversion: 1.8,
    performance: "Poor"
  },
  { 
    page: "Insurance FAQ", 
    channel: "Referral", 
    visitors: 3987, 
    conversion: 3.2,
    performance: "Good"
  },
];

// Data for transaction trends
export const transactionData = [
  { month: "Jan", transactions: 245, averageValue: 328 },
  { month: "Feb", transactions: 285, averageValue: 342 },
  { month: "Mar", transactions: 302, averageValue: 335 },
  { month: "Apr", transactions: 278, averageValue: 352 },
  { month: "May", transactions: 342, averageValue: 368 },
  { month: "Jun", transactions: 390, averageValue: 375 },
];

// Data for product distribution
export const purchasesByProductType = [
  { name: "Auto", value: 45, color: "#9b87f5" },
  { name: "Home", value: 30, color: "#0EA5E9" },
  { name: "Life", value: 15, color: "#F97316" },
  { name: "Travel", value: 10, color: "#8B5CF6" },
];

// Data for devices
export const deviceData = [
  { device: "Desktop", sessions: 8765, conversion: 3.8 },
  { device: "Mobile", sessions: 12435, conversion: 2.1 },
  { device: "Tablet", sessions: 2876, conversion: 2.5 },
];

// Traffic source breakdown
export const trafficSources = [
  { source: "Organic Search", percentage: 42 },
  { source: "Paid Search", percentage: 28 },
  { source: "Direct", percentage: 15 },
  { source: "Social", percentage: 8 },
  { source: "Referral", percentage: 5 },
  { source: "Email", percentage: 2 },
];
