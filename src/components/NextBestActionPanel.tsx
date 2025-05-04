
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { nextBestActions } from "@/data/mockData";
import { Check, Lightbulb } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

const ActionCard = ({ action }: { action: typeof nextBestActions[0] }) => {
  return (
    <div className="bg-card rounded-md p-4 border mb-3 hover:shadow-md transition-shadow">
      <div className="flex gap-3">
        <div className="h-10 w-10 rounded-full bg-insurance-soft-purple flex items-center justify-center">
          <Lightbulb className="h-5 w-5 text-insurance-purple" />
        </div>
        <div className="flex-1">
          <div className="flex justify-between">
            <h3 className="font-medium">{action.title}</h3>
            <div className="ai-tag flex items-center">
              <span className="mr-1">{action.aiConfidence}%</span> confidence
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{action.description}</p>
          
          <div className="mt-3 flex flex-wrap gap-1">
            {action.tags.map((tag) => (
              <Badge variant="outline" key={tag} className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Potential impact</p>
              <Progress value={action.impact} className="h-2" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Implementation effort</p>
              <Progress value={action.effort} className="h-2" />
            </div>
          </div>
          
          <div className="mt-4 flex justify-end gap-2">
            <Button size="sm" variant="outline">Dismiss</Button>
            <Button size="sm" className="gradient-purple-light">
              <Check className="mr-1 h-4 w-4" /> Implement
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const NextBestActionPanel = () => {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center">
          <Lightbulb className="mr-2 h-5 w-5 text-insurance-purple" />
          AI-Recommended Next Best Actions
        </CardTitle>
        <CardDescription>
          Personalized recommendations based on your audience behavior and marketing goals
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {nextBestActions.map((action) => (
            <ActionCard key={action.id} action={action} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default NextBestActionPanel;
