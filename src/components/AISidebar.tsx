
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb, X, Zap } from "lucide-react";

const AISidebar = () => {
  const [isOpen, setIsOpen] = React.useState(true);

  if (!isOpen) {
    return (
      <Button 
        className="fixed right-4 bottom-4 rounded-full w-12 h-12 shadow-lg gradient-purple-light flex items-center justify-center"
        onClick={() => setIsOpen(true)}
      >
        <Zap className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <Card className="fixed right-4 bottom-4 w-80 shadow-lg ai-glow">
      <div className="p-4 gradient-purple-light rounded-t-md flex justify-between items-center">
        <div className="flex items-center">
          <Zap className="h-5 w-5 mr-2" />
          <h3 className="font-bold">AI Assistant</h3>
        </div>
        <Button 
          size="icon" 
          variant="ghost" 
          className="h-7 w-7 rounded-full text-white/80 hover:text-white hover:bg-white/10"
          onClick={() => setIsOpen(false)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="p-4 max-h-[320px] overflow-y-auto">
        <div className="flex items-start gap-3 mb-4">
          <div className="h-8 w-8 rounded-full bg-insurance-soft-purple flex items-center justify-center flex-shrink-0">
            <Lightbulb className="h-4 w-4 text-insurance-purple" />
          </div>
          <div>
            <p className="text-sm font-medium mb-1">Email Campaign Opportunity</p>
            <p className="text-xs text-muted-foreground">
              We've detected 2,415 users who viewed your "Home Insurance Savings" page but didn't request a quote.
            </p>
          </div>
        </div>
        
        <div className="flex items-start gap-3 mb-4">
          <div className="h-8 w-8 rounded-full bg-insurance-soft-purple flex items-center justify-center flex-shrink-0">
            <Lightbulb className="h-4 w-4 text-insurance-purple" />
          </div>
          <div>
            <p className="text-sm font-medium mb-1">Content Recommendation</p>
            <p className="text-xs text-muted-foreground">
              Based on customer questions, creating a "Homeowner's Policy Explainer" video could address common concerns.
            </p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <div className="h-8 w-8 rounded-full bg-insurance-soft-purple flex items-center justify-center flex-shrink-0">
            <Lightbulb className="h-4 w-4 text-insurance-purple" />
          </div>
          <div>
            <p className="text-sm font-medium mb-1">Conversion Optimization</p>
            <p className="text-xs text-muted-foreground">
              A/B testing suggests the simplified quote form performs 37% better than the current version.
            </p>
          </div>
        </div>
      </div>
      
      <div className="p-3 border-t bg-muted/50">
        <Button className="w-full gradient-purple-light">
          <Zap className="mr-2 h-4 w-4" />
          Ask AI Assistant
        </Button>
      </div>
    </Card>
  );
};

export default AISidebar;
