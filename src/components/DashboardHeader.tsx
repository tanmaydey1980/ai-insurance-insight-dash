
import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Download, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const DashboardHeader = () => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
      <div>
        <h1 className="text-2xl font-bold">Insurance Marketing Dashboard</h1>
        <p className="text-muted-foreground">
          AI-powered insights and recommendations
        </p>
      </div>
      
      <div className="flex items-center gap-3 self-end">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-[200px] pl-9"
          />
        </div>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="h-10">
              <Calendar className="mr-2 h-4 w-4" />
              Last 30 Days
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[240px] p-0" align="end">
            <div className="grid gap-2 p-4">
              <Button variant="outline" size="sm" className="justify-start">
                Today
              </Button>
              <Button variant="outline" size="sm" className="justify-start">
                Yesterday
              </Button>
              <Button variant="outline" size="sm" className="justify-start">
                Last 7 days
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="justify-start bg-accent"
              >
                Last 30 days
              </Button>
              <Button variant="outline" size="sm" className="justify-start">
                This month
              </Button>
              <Button variant="outline" size="sm" className="justify-start">
                Last 3 months
              </Button>
              <Button variant="outline" size="sm" className="justify-start">
                Custom range
              </Button>
            </div>
          </PopoverContent>
        </Popover>
        
        <Button size="sm" className="h-10">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
