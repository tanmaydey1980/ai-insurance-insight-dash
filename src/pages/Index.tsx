
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

const Index = () => {
  return (
    <DashboardLayout>
      <DashboardHeader />
      <div className="animate-fade-in">
        <MetricsOverview />
        
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
