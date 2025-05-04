
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import DashboardHeader from "@/components/DashboardHeader";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, Legend, Line, LineChart, Pie, PieChart, XAxis, YAxis } from "recharts";
import { reportTemplates, dataSources, savedReports, ReportTemplate, ReportMetric } from "@/data/reportsData";
import { channelData, transactionData, purchasesByProductType } from "@/data/reportingData";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PlusCircle, FileChartBar } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(1, { message: "Report name is required" }),
  description: z.string().optional(),
  template: z.string().min(1, { message: "Template is required" }),
  dataSource: z.string().min(1, { message: "Data source is required" }),
  metrics: z.array(z.string()).min(1, { message: "Select at least one metric" }),
  refreshRate: z.string().min(1, { message: "Refresh rate is required" }),
});

type FormValues = z.infer<typeof formSchema>;

const CreateReport = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState<ReportTemplate | null>(null);
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);
  const [previewData, setPreviewData] = useState<any[]>([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      template: "",
      dataSource: "",
      metrics: [],
      refreshRate: "daily",
    },
  });

  const handleTemplateChange = (templateId: string) => {
    const template = reportTemplates.find((t) => t.id === templateId);
    if (template) {
      setSelectedTemplate(template);
      setSelectedMetrics([]);
      form.setValue("metrics", []);
      
      // Set up preview data based on template type
      if (template.id === 'channel-performance') {
        setPreviewData(channelData);
      } else if (template.id === 'transaction-trends') {
        setPreviewData(transactionData);
      } else if (template.id === 'product-distribution') {
        setPreviewData(purchasesByProductType);
      }
    }
  };

  const handleMetricToggle = (metricId: string, checked: boolean) => {
    let updatedMetrics = [...selectedMetrics];
    
    if (checked) {
      updatedMetrics.push(metricId);
    } else {
      updatedMetrics = updatedMetrics.filter(id => id !== metricId);
    }
    
    setSelectedMetrics(updatedMetrics);
    form.setValue("metrics", updatedMetrics);
  };
  
  const onSubmit = (data: FormValues) => {
    // In a real app, this would save to the database
    const newReport = {
      id: (savedReports.length + 1).toString(),
      name: data.name,
      description: data.description || "",
      template: data.template,
      dataSource: data.dataSource,
      metrics: data.metrics,
      refreshRate: data.refreshRate,
      createdAt: new Date(),
      lastUpdated: new Date(),
    };
    
    // Add to the saved reports (in memory only for demo)
    savedReports.push(newReport);
    
    toast({
      title: "Report Created",
      description: "Your report has been successfully created",
    });
    
    navigate("/reports");
  };

  const renderPreview = () => {
    if (!selectedTemplate || selectedMetrics.length === 0 || !previewData.length) {
      return (
        <div className="flex items-center justify-center h-[300px] bg-muted/20 rounded-md border border-dashed">
          <div className="text-center text-muted-foreground">
            <FileChartBar className="h-10 w-10 mx-auto mb-2" />
            <p>Select a template and metrics to preview your report</p>
          </div>
        </div>
      );
    }

    const chartConfig: Record<string, { label: string, theme: Record<"light" | "dark", string> }> = {};
    
    selectedMetrics.forEach(metricId => {
      const metric = selectedTemplate.availableMetrics.find(m => m.id === metricId);
      if (metric) {
        chartConfig[metric.dataKey] = { 
          label: metric.name, 
          theme: { light: metric.color, dark: metric.color } 
        };
      }
    });

    switch (selectedTemplate.type) {
      case 'bar':
        return (
          <div className="h-[300px]">
            <ChartContainer config={chartConfig}>
              <BarChart
                margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                data={previewData}
              >
                <XAxis dataKey="channel" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                {selectedMetrics.map((metricId) => {
                  const metric = selectedTemplate.availableMetrics.find(m => m.id === metricId);
                  if (metric) {
                    return <Bar key={metric.id} dataKey={metric.dataKey} fill={metric.color} name={metric.name} />;
                  }
                  return null;
                })}
                <Legend />
              </BarChart>
            </ChartContainer>
          </div>
        );
      
      case 'line':
        return (
          <div className="h-[300px]">
            <ChartContainer config={chartConfig}>
              <LineChart
                margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                data={previewData}
              >
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                {selectedMetrics.map((metricId) => {
                  const metric = selectedTemplate.availableMetrics.find(m => m.id === metricId);
                  if (metric) {
                    return (
                      <Line 
                        key={metric.id} 
                        type="monotone" 
                        dataKey={metric.dataKey} 
                        stroke={metric.color}
                        strokeWidth={2}
                        dot={false}
                        name={metric.name}
                      />
                    );
                  }
                  return null;
                })}
                <Legend />
              </LineChart>
            </ChartContainer>
          </div>
        );
        
      case 'pie':
        return (
          <div className="h-[300px]">
            <PieChart margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
              <Pie
                data={previewData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              />
              <ChartTooltip />
              <Legend />
            </PieChart>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <DashboardHeader />
      <div className="animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Create New Report</h1>
          <Button onClick={() => navigate("/reports")} variant="outline">
            Cancel
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Report Configuration</CardTitle>
                <CardDescription>
                  Set up your new report by filling in the details below
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Report Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter report name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Enter a description for your report" 
                                className="resize-none" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="template"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Report Template</FormLabel>
                              <Select 
                                onValueChange={(value) => {
                                  field.onChange(value);
                                  handleTemplateChange(value);
                                }} 
                                value={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a template" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {reportTemplates.map((template) => (
                                    <SelectItem key={template.id} value={template.id}>
                                      {template.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormDescription>
                                {selectedTemplate?.description}
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="dataSource"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Data Source</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                value={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a data source" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {dataSources.map((source) => (
                                    <SelectItem key={source.id} value={source.id}>
                                      {source.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormDescription>
                                Select the source for your report data
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="metrics"
                        render={() => (
                          <FormItem>
                            <FormLabel>Metrics</FormLabel>
                            <div className="space-y-2">
                              {selectedTemplate?.availableMetrics.map((metric) => (
                                <div key={metric.id} className="flex items-center space-x-2">
                                  <Checkbox 
                                    id={`metric-${metric.id}`}
                                    checked={selectedMetrics.includes(metric.id)}
                                    onCheckedChange={(checked) => 
                                      handleMetricToggle(metric.id, checked === true)
                                    }
                                  />
                                  <label 
                                    htmlFor={`metric-${metric.id}`}
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                  >
                                    {metric.name}
                                    <span className="ml-2 text-muted-foreground text-xs">
                                      {metric.description}
                                    </span>
                                  </label>
                                </div>
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="refreshRate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Refresh Rate</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a refresh rate" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="realtime">Real-time</SelectItem>
                                <SelectItem value="hourly">Hourly</SelectItem>
                                <SelectItem value="daily">Daily</SelectItem>
                                <SelectItem value="weekly">Weekly</SelectItem>
                                <SelectItem value="monthly">Monthly</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              How often should this report refresh with new data
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <CardFooter className="px-0 pt-4">
                      <Button type="submit" className="ml-auto">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Create Report
                      </Button>
                    </CardFooter>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Report Preview</CardTitle>
                <CardDescription>
                  Preview how your report will look
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                {renderPreview()}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreateReport;
