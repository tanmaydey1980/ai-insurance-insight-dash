
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { audienceSegments } from "@/data/mockData";
import { Lightbulb, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const AudienceSegmentation = () => {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center">
          <Users className="mr-2 h-5 w-5 text-insurance-purple" />
          Real-time Audience Segmentation
        </CardTitle>
        <CardDescription>
          AI-powered audience segments with personalization opportunities
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {audienceSegments.map((segment) => (
            <div
              key={segment.id}
              className="border rounded-lg p-4 bg-card transition-shadow hover:shadow-md"
            >
              <div className="flex justify-between items-start">
                <h3 className="font-medium">{segment.name}</h3>
                <Badge variant="secondary">{segment.size.toLocaleString()} users</Badge>
              </div>
              
              <div className="flex flex-wrap gap-1 mt-2">
                {segment.traits.map((trait) => (
                  <span
                    key={trait}
                    className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-secondary text-secondary-foreground"
                  >
                    {trait}
                  </span>
                ))}
              </div>
              
              <div className="mt-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-medium">Conversion Rate</span>
                  <span className="text-xs font-medium">{segment.conversion}%</span>
                </div>
                <Progress value={segment.conversion * 10} className="h-1" />
              </div>
              
              {segment.aiRecommendation && (
                <div className="mt-3 text-xs bg-insurance-soft-purple p-2 rounded-md">
                  <div className="flex gap-1 items-center text-insurance-purple font-medium mb-1">
                    <Lightbulb className="h-3 w-3" /> 
                    AI Recommendation
                  </div>
                  <p>{segment.aiRecommendation}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AudienceSegmentation;
