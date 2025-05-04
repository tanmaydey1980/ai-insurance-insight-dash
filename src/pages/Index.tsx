
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import DashboardHeader from "@/components/DashboardHeader";
import MetricsOverview from "@/components/MetricsOverview";
import NextBestActionPanel from "@/components/NextBestActionPanel";
import CustomerJourneyMap from "@/components/CustomerJourneyMap";
import AudienceSegmentation from "@/components/AudienceSegmentation";
import ContentPerformance from "@/components/ContentPerformance";
import BehavioralTargeting from "@/components/BehavioralTargeting";
import AISidebar from "@/components/AISidebar";
import { Button } from "@/components/ui/button";
import { ChartBarIcon } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <DashboardLayout>
      <DashboardHeader />
      <div className="animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <div>
            <MetricsOverview />
          </div>
          <Link to="/reports">
            <Button variant="outline" className="flex items-center gap-2">
              <ChartBarIcon className="h-4 w-4" />
              Reports & Analytics
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <NextBestActionPanel />
          <CustomerJourneyMap />
        </div>
        
        <AudienceSegmentation />
        <ContentPerformance />
        <BehavioralTargeting />
      </div>
      
      <AISidebar />
    </DashboardLayout>
  );
};

export default Index;
