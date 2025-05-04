
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import DashboardHeader from "@/components/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import ChannelPerformance from "@/components/ChannelPerformance";
import TransactionMetrics from "@/components/TransactionMetrics";
import MetricsSetup from "@/components/MetricsSetup";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Reports = () => {
  const { toast } = useToast();
  const [activeMetrics, setActiveMetrics] = useState({
    conversionRate: true,
    clickThroughRate: true,
    costPerAcquisition: false,
    returnOnAdSpend: false
  });
  
  const [refreshing, setRefreshing] = useState(false);
  
  const handleRefresh = () => {
    setRefreshing(true);
    toast({
      title: "Refreshing data",
      description: "Fetching the latest metrics from all sources..."
    });
    
    // Simulate data refresh
    setTimeout(() => {
      setRefreshing(false);
      toast({
        title: "Data refreshed",
        description: "All metrics have been updated with the latest data."
      });
    }, 2000);
  };

  return (
    <DashboardLayout>
      <DashboardHeader />
      <div className="animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Reports & Analytics</h1>
          <Button 
            onClick={handleRefresh} 
            disabled={refreshing}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
            Refresh Data
          </Button>
        </div>
        
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="channels">Channel Performance</TabsTrigger>
            <TabsTrigger value="transactions">Transaction Analysis</TabsTrigger>
            <TabsTrigger value="setup">Metrics Setup</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Performance Overview</CardTitle>
                <CardDescription>
                  Consolidated view of your key performance metrics across all channels
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ChartContainer 
                    config={{
                      conversion: { label: "Conversion Rate", theme: { light: "#9b87f5", dark: "#9b87f5" } },
                      ctr: { label: "Click Through Rate", theme: { light: "#0EA5E9", dark: "#0EA5E9" } }
                    }}
                  >
                    <LineChart 
                      margin={{ top: 20, right: 10, left: 10, bottom: 20 }}
                      data={overviewData}
                    >
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      {activeMetrics.conversionRate && <Line type="monotone" dataKey="conversion" stroke="#9b87f5" strokeWidth={2} dot={false} />}
                      {activeMetrics.clickThroughRate && <Line type="monotone" dataKey="ctr" stroke="#0EA5E9" strokeWidth={2} dot={false} />}
                      <Legend />
                    </LineChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="channels">
            <ChannelPerformance activeMetrics={activeMetrics} />
          </TabsContent>
          
          <TabsContent value="transactions">
            <TransactionMetrics activeMetrics={activeMetrics} />
          </TabsContent>
          
          <TabsContent value="setup">
            <MetricsSetup 
              activeMetrics={activeMetrics} 
              setActiveMetrics={setActiveMetrics} 
            />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

// Sample overview data
const overviewData = [
  { month: "Jan", conversion: 2.4, ctr: 3.8 },
  { month: "Feb", conversion: 2.7, ctr: 4.2 },
  { month: "Mar", conversion: 3.2, ctr: 4.8 },
  { month: "Apr", conversion: 3.1, ctr: 4.5 },
  { month: "May", conversion: 3.5, ctr: 5.2 },
  { month: "Jun", conversion: 3.8, ctr: 5.7 },
];

export default Reports;
