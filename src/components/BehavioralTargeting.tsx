
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { behavioralScenarios } from "@/data/mockData";
import { ArrowRight, Target, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const BehavioralTargeting = () => {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center">
          <Target className="mr-2 h-5 w-5 text-insurance-purple" />
          Behavioral Targeting Simulator
        </CardTitle>
        <CardDescription>
          AI-powered content personalization based on user behavior patterns
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={behavioralScenarios[0].id}>
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-4">
            {behavioralScenarios.map((scenario) => (
              <TabsTrigger key={scenario.id} value={scenario.id}>
                {scenario.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {behavioralScenarios.map((scenario) => (
            <TabsContent key={scenario.id} value={scenario.id} className="space-y-4">
              <div className="grid md:grid-cols-6 gap-4 bg-muted/50 p-4 rounded-lg">
                <div className="md:col-span-2 space-y-2">
                  <h3 className="font-medium text-lg">{scenario.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {scenario.description}
                  </p>
                  <div className="bg-insurance-soft-purple text-insurance-purple px-3 py-1 rounded-md inline-flex items-center text-sm mt-2">
                    <Zap className="mr-1 h-4 w-4" />
                    Predicted Lift: {scenario.conversionLift}
                  </div>
                </div>
                
                <div className="md:col-span-1 flex items-center justify-center">
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                    <ArrowRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
                
                <div className="md:col-span-3 bg-card border p-4 rounded-lg">
                  <h4 className="font-medium mb-2">AI Recommended Content</h4>
                  <p className="text-sm mb-4">{scenario.recommendedContent}</p>
                  <div className="flex justify-end">
                    <Button size="sm" className="gradient-purple-light">
                      Preview Personalization
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="border p-4 rounded-lg">
                <h4 className="font-medium mb-3">How It Works</h4>
                <ol className="list-decimal ml-5 text-sm space-y-2">
                  <li>AI identifies users who match this behavioral pattern</li>
                  <li>Dynamic content is personalized based on intent signals</li>
                  <li>Tailored messaging is delivered across touchpoints</li>
                  <li>Performance is continuously measured and optimized</li>
                </ol>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default BehavioralTargeting;
