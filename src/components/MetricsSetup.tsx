
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface MetricsSetupProps {
  activeMetrics: {
    conversionRate: boolean;
    clickThroughRate: boolean;
    costPerAcquisition: boolean;
    returnOnAdSpend: boolean;
  };
  setActiveMetrics: React.Dispatch<React.SetStateAction<{
    conversionRate: boolean;
    clickThroughRate: boolean;
    costPerAcquisition: boolean;
    returnOnAdSpend: boolean;
  }>>;
}

const MetricsSetup: React.FC<MetricsSetupProps> = ({ activeMetrics, setActiveMetrics }) => {
  const { toast } = useToast();
  const [dataRefreshRate, setDataRefreshRate] = useState("daily");
  const [dataSource, setDataSource] = useState("all");
  const [customMetric, setCustomMetric] = useState({
    name: "",
    formula: "",
    channel: "all"
  });

  const handleMetricChange = (metric: keyof typeof activeMetrics) => {
    setActiveMetrics(prev => ({
      ...prev,
      [metric]: !prev[metric]
    }));

    toast({
      title: `Metric ${activeMetrics[metric] ? "Disabled" : "Enabled"}`,
      description: `${getMetricName(metric)} is now ${activeMetrics[metric] ? "hidden from" : "visible in"} your reports.`
    });
  };

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your reporting preferences have been updated."
    });
  };

  const handleAddCustomMetric = () => {
    if (!customMetric.name || !customMetric.formula) {
      toast({
        title: "Validation Error",
        description: "Please provide both name and formula for your custom metric.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Custom Metric Created",
      description: `${customMetric.name} has been added to your metrics.`
    });
    
    // Reset form
    setCustomMetric({
      name: "",
      formula: "",
      channel: "all"
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Configure Visible Metrics</CardTitle>
          <CardDescription>
            Choose which metrics to display in your reports and dashboards
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="conversion-rate" className="flex flex-col space-y-1">
              <span>Conversion Rate</span>
              <span className="font-normal text-xs text-muted-foreground">
                Percentage of visitors who complete a desired action
              </span>
            </Label>
            <Switch
              id="conversion-rate"
              checked={activeMetrics.conversionRate}
              onCheckedChange={() => handleMetricChange('conversionRate')}
            />
          </div>
          
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="click-through-rate" className="flex flex-col space-y-1">
              <span>Click Through Rate</span>
              <span className="font-normal text-xs text-muted-foreground">
                Percentage of viewers who click on a specific link
              </span>
            </Label>
            <Switch
              id="click-through-rate"
              checked={activeMetrics.clickThroughRate}
              onCheckedChange={() => handleMetricChange('clickThroughRate')}
            />
          </div>
          
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="cost-per-acquisition" className="flex flex-col space-y-1">
              <span>Cost per Acquisition</span>
              <span className="font-normal text-xs text-muted-foreground">
                Average cost to acquire a customer
              </span>
            </Label>
            <Switch
              id="cost-per-acquisition"
              checked={activeMetrics.costPerAcquisition}
              onCheckedChange={() => handleMetricChange('costPerAcquisition')}
            />
          </div>
          
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="return-on-ad-spend" className="flex flex-col space-y-1">
              <span>Return on Ad Spend</span>
              <span className="font-normal text-xs text-muted-foreground">
                Revenue generated per dollar of advertising spend
              </span>
            </Label>
            <Switch
              id="return-on-ad-spend"
              checked={activeMetrics.returnOnAdSpend}
              onCheckedChange={() => handleMetricChange('returnOnAdSpend')}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSaveSettings}>Save Settings</Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Data Collection Settings</CardTitle>
          <CardDescription>
            Configure how and when data is collected for your reports
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="schedule">
            <TabsList>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              <TabsTrigger value="sources">Data Sources</TabsTrigger>
              <TabsTrigger value="custom">Custom Metrics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="schedule" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="refresh-rate">Data Refresh Rate</Label>
                <Select value={dataRefreshRate} onValueChange={setDataRefreshRate}>
                  <SelectTrigger id="refresh-rate">
                    <SelectValue placeholder="Select refresh rate" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="realtime">Real-time</SelectItem>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button onClick={handleSaveSettings}>Update Schedule</Button>
            </TabsContent>
            
            <TabsContent value="sources" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="data-source">Primary Data Source</Label>
                <Select value={dataSource} onValueChange={setDataSource}>
                  <SelectTrigger id="data-source">
                    <SelectValue placeholder="Select data source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sources</SelectItem>
                    <SelectItem value="web">Website Analytics</SelectItem>
                    <SelectItem value="social">Social Media</SelectItem>
                    <SelectItem value="email">Email Campaigns</SelectItem>
                    <SelectItem value="advertising">Paid Advertising</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button onClick={handleSaveSettings}>Update Sources</Button>
            </TabsContent>
            
            <TabsContent value="custom" className="space-y-4 pt-4">
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="metric-name">Metric Name</Label>
                    <Input 
                      id="metric-name" 
                      placeholder="e.g., Engagement Score" 
                      value={customMetric.name}
                      onChange={(e) => setCustomMetric({...customMetric, name: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="metric-formula">Formula/Calculation</Label>
                    <Input 
                      id="metric-formula" 
                      placeholder="e.g., (Clicks + Shares) / Impressions" 
                      value={customMetric.formula}
                      onChange={(e) => setCustomMetric({...customMetric, formula: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="metric-channel">Apply to Channel</Label>
                    <Select 
                      value={customMetric.channel} 
                      onValueChange={(value) => setCustomMetric({...customMetric, channel: value})}
                    >
                      <SelectTrigger id="metric-channel">
                        <SelectValue placeholder="Select channel" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Channels</SelectItem>
                        <SelectItem value="web">Website</SelectItem>
                        <SelectItem value="social">Social Media</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="paid">Paid Ads</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Button onClick={handleAddCustomMetric}>Add Custom Metric</Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

const getMetricName = (metric: string): string => {
  switch(metric) {
    case 'conversionRate': return 'Conversion Rate';
    case 'clickThroughRate': return 'Click Through Rate';
    case 'costPerAcquisition': return 'Cost per Acquisition';
    case 'returnOnAdSpend': return 'Return on Ad Spend';
    default: return metric;
  }
};

export default MetricsSetup;
