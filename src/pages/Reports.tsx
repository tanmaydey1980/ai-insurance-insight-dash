
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
import { RefreshCw, PlusCircle, FileChartBar, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { CustomReport, savedReports } from "@/data/reportsData";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

const Reports = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
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
          <div className="flex space-x-2">
            <Button 
              onClick={handleRefresh} 
              disabled={refreshing}
              variant="outline"
              className="flex items-center gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
              Refresh Data
            </Button>
            
            <Button onClick={() => navigate("/create-report")} className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              New Report
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="channels">Channel Performance</TabsTrigger>
            <TabsTrigger value="transactions">Transaction Analysis</TabsTrigger>
            <TabsTrigger value="custom">Custom Reports</TabsTrigger>
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
          
          <TabsContent value="custom" className="space-y-6">
            {savedReports.length === 0 ? (
              <Card className="flex flex-col items-center justify-center p-10 text-center">
                <FileChartBar className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No custom reports yet</h3>
                <p className="text-muted-foreground mb-6">
                  Create your first custom report to visualize data specific to your needs
                </p>
                <Button onClick={() => navigate("/create-report")}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create Report
                </Button>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {savedReports.map((report) => (
                  <ReportCard key={report.id} report={report} />
                ))}
                <Card className="flex flex-col items-center justify-center p-10 text-center border-dashed">
                  <PlusCircle className="h-10 w-10 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">Create New Report</h3>
                  <p className="text-muted-foreground mb-4">
                    Add a new custom report to your dashboard
                  </p>
                  <Button onClick={() => navigate("/create-report")} variant="outline">
                    Create Report
                  </Button>
                </Card>
              </div>
            )}
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

// Individual report card component
const ReportCard = ({ report }: { report: CustomReport }) => {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{report.name}</CardTitle>
            <CardDescription>{report.description}</CardDescription>
          </div>
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {report.refreshRate}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="text-sm text-muted-foreground mb-4">
          <div><span className="font-medium">Template:</span> {report.template.replace(/-/g, " ")}</div>
          <div><span className="font-medium">Source:</span> {report.dataSource}</div>
          <div><span className="font-medium">Metrics:</span> {report.metrics.length}</div>
        </div>
        <div className="text-xs text-muted-foreground mt-2">
          Created {format(new Date(report.createdAt), "MMM d, yyyy")}
          <br />
          Last updated {format(new Date(report.lastUpdated), "MMM d, yyyy")}
        </div>
      </CardContent>
      <div className="p-4 pt-0 mt-auto flex justify-end">
        <Button size="sm" variant="outline">View Report</Button>
      </div>
    </Card>
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
