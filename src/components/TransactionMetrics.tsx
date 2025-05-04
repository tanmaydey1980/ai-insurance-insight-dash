
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, Cell, Legend, Pie, PieChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { transactionData, purchasesByProductType } from "@/data/reportingData";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

interface TransactionMetricsProps {
  activeMetrics: {
    conversionRate: boolean;
    clickThroughRate: boolean;
    costPerAcquisition: boolean;
    returnOnAdSpend: boolean;
  };
}

const TransactionMetrics: React.FC<TransactionMetricsProps> = ({ activeMetrics }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Transaction Trends by Month</CardTitle>
          <CardDescription>
            Monthly transaction volume and average purchase value
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ChartContainer 
              config={{
                transactions: { label: "Transactions", theme: { light: "#9b87f5", dark: "#9b87f5" } },
                averageValue: { label: "Avg. Value ($)", theme: { light: "#0EA5E9", dark: "#0EA5E9" } },
              }}
            >
              <BarChart 
                margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                data={transactionData}
              >
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" orientation="left" />
                <YAxis yAxisId="right" orientation="right" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar yAxisId="left" dataKey="transactions" fill="#9b87f5" name="Transactions" />
                <Bar yAxisId="right" dataKey="averageValue" fill="#0EA5E9" name="Avg. Value" />
                <Legend />
              </BarChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Products by Type</CardTitle>
          <CardDescription>
            Distribution of insurance products sold
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={purchasesByProductType}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {purchasesByProductType.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Transaction Summary</CardTitle>
          <CardDescription>
            Key transaction metrics and performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactionSummary.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{item.name}</p>
                  <p className="text-2xl font-bold">{item.value}</p>
                </div>
                <div className="flex items-center">
                  <span
                    className={`inline-flex items-center text-xs font-medium ${
                      item.change > 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {item.change > 0 ? (
                      <ArrowUpIcon className="h-3 w-3 mr-1" />
                    ) : (
                      <ArrowDownIcon className="h-3 w-3 mr-1" />
                    )}
                    {Math.abs(item.change)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const transactionSummary = [
  { name: "Total Transactions", value: "1,842", change: 15.3 },
  { name: "Average Order Value", value: "$342.18", change: 5.7 },
  { name: "Conversion Rate", value: "3.2%", change: 0.8 },
  { name: "Cart Abandonment", value: "42.6%", change: -3.5 },
];

export default TransactionMetrics;
