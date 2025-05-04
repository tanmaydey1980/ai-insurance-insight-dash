
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowDownIcon, ArrowUpIcon, Zap } from "lucide-react";
import { kpiMetrics } from "@/data/mockData";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const MetricsOverview = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {kpiMetrics.map((metric, index) => (
        <Card key={index} className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {metric.title}
                </p>
                <h3 className="text-2xl font-bold mt-1">{metric.value}</h3>
                <div className="flex items-center mt-1">
                  <span
                    className={`inline-flex items-center text-xs font-medium ${
                      metric.change > 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {metric.change > 0 ? (
                      <ArrowUpIcon className="h-3 w-3 mr-1" />
                    ) : (
                      <ArrowDownIcon className="h-3 w-3 mr-1" />
                    )}
                    {Math.abs(metric.change)}%
                  </span>
                  <span className="text-xs text-muted-foreground ml-1.5">vs previous period</span>
                </div>
              </div>
              {metric.aiInsight && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="h-8 w-8 rounded-full bg-insurance-soft-purple flex items-center justify-center cursor-pointer ai-pulse">
                        <Zap className="h-4 w-4 text-insurance-purple" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="max-w-[250px]">
                      <p className="text-xs">
                        <span className="font-semibold">AI Insight:</span>{" "}
                        {metric.aiInsight}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MetricsOverview;
