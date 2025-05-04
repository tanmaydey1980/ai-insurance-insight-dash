
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { journeySteps } from "@/data/mockData";
import { ArrowRight, Lightbulb } from "lucide-react";

const CustomerJourneyMap = () => {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle>Customer Journey Optimization</CardTitle>
        <CardDescription>
          AI-analyzed customer journey with optimization opportunities
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="min-w-[700px]">
            <div className="flex items-start">
              {journeySteps.map((step, index) => (
                <React.Fragment key={step.id}>
                  <div className={`flex-1 text-center ${step.bottleneck ? 'relative' : ''}`}>
                    <div className={`px-2 mx-2 rounded-lg py-4 ${step.bottleneck ? 'bg-insurance-soft-yellow border border-yellow-300' : 'bg-card border'}`}>
                      <p className="text-sm font-medium">{step.name}</p>
                      <p className="text-2xl font-bold mt-1">{step.conversion}%</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {step.dropoff > 0 ? `-${step.dropoff}% drop` : 'Complete'}
                      </p>

                      {step.aiOptimization && (
                        <div className="mt-3 text-xs bg-insurance-soft-purple p-2 rounded-md text-left">
                          <div className="flex gap-1 items-center text-insurance-purple font-medium mb-1">
                            <Lightbulb className="h-3 w-3" /> 
                            AI Optimization
                          </div>
                          <p className="text-left">{step.aiOptimization}</p>
                        </div>
                      )}
                    </div>
                    {step.bottleneck && (
                      <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-orange-100 text-orange-800 text-xs font-medium px-2 py-0.5 rounded-full border border-orange-200">
                        Bottleneck
                      </div>
                    )}
                  </div>
                  {index < journeySteps.length - 1 && (
                    <div className="flex items-center justify-center mt-8">
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerJourneyMap;
