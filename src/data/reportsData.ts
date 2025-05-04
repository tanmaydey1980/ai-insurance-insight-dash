
// Pre-defined report templates and metrics
export interface ReportMetric {
  id: string;
  name: string;
  description: string;
  dataKey: string;
  color: string;
  format?: string;
}

export interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  type: 'bar' | 'line' | 'pie' | 'table';
  availableMetrics: ReportMetric[];
}

export interface CustomReport {
  id: string;
  name: string;
  description: string;
  template: string;
  dataSource: string;
  metrics: string[];
  refreshRate: string;
  createdAt: Date;
  lastUpdated: Date;
}

// Available templates for reports
export const reportTemplates: ReportTemplate[] = [
  {
    id: 'channel-performance',
    name: 'Channel Performance',
    description: 'Shows performance metrics across different marketing channels',
    type: 'bar',
    availableMetrics: [
      { id: 'conversion', name: 'Conversion Rate', description: 'Percentage of visitors who complete a desired action', dataKey: 'conversion', color: '#9b87f5', format: '%' },
      { id: 'ctr', name: 'Click Through Rate', description: 'Percentage of viewers who click on a specific link', dataKey: 'ctr', color: '#0EA5E9', format: '%' },
      { id: 'cpa', name: 'Cost per Acquisition', description: 'Average cost to acquire a customer', dataKey: 'cpa', color: '#F97316', format: '$' },
      { id: 'roas', name: 'Return on Ad Spend', description: 'Revenue generated per dollar of advertising spend', dataKey: 'roas', color: '#8B5CF6', format: 'x' },
    ]
  },
  {
    id: 'transaction-trends',
    name: 'Transaction Trends',
    description: 'Shows transaction volume and average purchase values over time',
    type: 'line',
    availableMetrics: [
      { id: 'transactions', name: 'Transactions', description: 'Number of transactions completed', dataKey: 'transactions', color: '#9b87f5' },
      { id: 'averageValue', name: 'Average Value', description: 'Average value of transactions', dataKey: 'averageValue', color: '#0EA5E9', format: '$' },
    ]
  },
  {
    id: 'product-distribution',
    name: 'Product Distribution',
    description: 'Distribution of products by category',
    type: 'pie',
    availableMetrics: [
      { id: 'product-distribution', name: 'Product Distribution', description: 'Distribution of products by category', dataKey: 'value', color: '#9b87f5' }
    ]
  }
];

// Available data sources
export const dataSources = [
  { id: 'crm', name: 'CRM System' },
  { id: 'analytics', name: 'Web Analytics' },
  { id: 'social', name: 'Social Media' },
  { id: 'email', name: 'Email Marketing' },
  { id: 'advertising', name: 'Advertising Platforms' },
];

// Mock data for saved custom reports
export const savedReports: CustomReport[] = [
  {
    id: '1',
    name: 'Monthly Channel Comparison',
    description: 'Compares performance across channels monthly',
    template: 'channel-performance',
    dataSource: 'analytics',
    metrics: ['conversion', 'ctr'],
    refreshRate: 'daily',
    createdAt: new Date('2025-04-15'),
    lastUpdated: new Date('2025-04-28')
  },
  {
    id: '2',
    name: 'Q1 Transaction Analysis',
    description: 'Analysis of Q1 transaction patterns',
    template: 'transaction-trends',
    dataSource: 'crm',
    metrics: ['transactions', 'averageValue'],
    refreshRate: 'weekly',
    createdAt: new Date('2025-04-01'),
    lastUpdated: new Date('2025-04-20')
  }
];
