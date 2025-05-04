
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, Legend, XAxis, YAxis } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { channelData, topPerformingPages } from "@/data/reportingData";

interface ChannelPerformanceProps {
  activeMetrics: {
    conversionRate: boolean;
    clickThroughRate: boolean;
    costPerAcquisition: boolean;
    returnOnAdSpend: boolean;
  };
}

const ChannelPerformance: React.FC<ChannelPerformanceProps> = ({ activeMetrics }) => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Channel Performance</CardTitle>
          <CardDescription>
            Comparison of performance metrics across different marketing channels
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[350px]">
            <ChartContainer 
              config={{
                conversion: { label: "Conversion Rate (%)", theme: { light: "#9b87f5", dark: "#9b87f5" } },
                ctr: { label: "Click Through Rate (%)", theme: { light: "#0EA5E9", dark: "#0EA5E9" } },
                cpa: { label: "Cost per Acquisition ($)", theme: { light: "#F97316", dark: "#F97316" } },
                roas: { label: "Return on Ad Spend (x)", theme: { light: "#8B5CF6", dark: "#8B5CF6" } }
              }}
            >
              <BarChart 
                margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                data={channelData}
              >
                <XAxis dataKey="channel" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                {activeMetrics.conversionRate && <Bar dataKey="conversion" fill="#9b87f5" name="Conversion Rate" />}
                {activeMetrics.clickThroughRate && <Bar dataKey="ctr" fill="#0EA5E9" name="Click Through Rate" />}
                {activeMetrics.costPerAcquisition && <Bar dataKey="cpa" fill="#F97316" name="Cost per Acquisition" />}
                {activeMetrics.returnOnAdSpend && <Bar dataKey="roas" fill="#8B5CF6" name="Return on Ad Spend" />}
                <Legend />
              </BarChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Top Performing Pages by Channel</CardTitle>
          <CardDescription>
            Pages with highest engagement metrics across channels
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Page</TableHead>
                <TableHead>Channel</TableHead>
                <TableHead>Visitors</TableHead>
                <TableHead>Conversion</TableHead>
                <TableHead>Performance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topPerformingPages.map((page, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{page.page}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-insurance-soft-purple bg-opacity-30">
                      {page.channel}
                    </Badge>
                  </TableCell>
                  <TableCell>{page.visitors.toLocaleString()}</TableCell>
                  <TableCell>{page.conversion}%</TableCell>
                  <TableCell>
                    <PerformanceBadge performance={page.performance} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

const PerformanceBadge = ({ performance }: { performance: string }) => {
  const badgeColor = 
    performance === "Excellent" ? "bg-green-500" :
    performance === "Good" ? "bg-green-400" :
    performance === "Average" ? "bg-yellow-400" :
    performance === "Poor" ? "bg-red-400" : "bg-gray-400";

  return (
    <Badge className={`${badgeColor} text-white`}>
      {performance}
    </Badge>
  );
};

export default ChannelPerformance;
