
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { contentItems } from "@/data/mockData";
import { BarChart2, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const SentimentIndicator = ({ sentiment }: { sentiment: number }) => {
  // Determine color based on sentiment score (0-1)
  let color = "";
  if (sentiment >= 0.8) color = "bg-green-500";
  else if (sentiment >= 0.6) color = "bg-green-400";
  else if (sentiment >= 0.4) color = "bg-yellow-400";
  else if (sentiment >= 0.2) color = "bg-orange-400";
  else color = "bg-red-500";

  return (
    <div className="flex items-center">
      <div className={`w-3 h-3 rounded-full ${color} mr-2`}></div>
      <span>{sentiment.toFixed(1)}</span>
    </div>
  );
};

const ContentPerformance = () => {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center">
          <BarChart2 className="mr-2 h-5 w-5 text-insurance-purple" />
          Content Performance Analysis
        </CardTitle>
        <CardDescription>
          AI-analyzed content performance with sentiment and tag predictions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Content</TableHead>
              <TableHead className="hidden md:table-cell">Type</TableHead>
              <TableHead className="text-right">Views</TableHead>
              <TableHead className="text-right">Engagement</TableHead>
              <TableHead className="text-right">Conversion</TableHead>
              <TableHead>Sentiment</TableHead>
              <TableHead className="hidden md:table-cell">AI Tags</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contentItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.title}</TableCell>
                <TableCell className="hidden md:table-cell">{item.type}</TableCell>
                <TableCell className="text-right">{item.views.toLocaleString()}</TableCell>
                <TableCell className="text-right">{item.engagement}%</TableCell>
                <TableCell className="text-right">{item.conversion}%</TableCell>
                <TableCell>
                  <SentimentIndicator sentiment={item.sentiment} />
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <div className="flex flex-wrap gap-1">
                    {item.aiTags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs flex items-center gap-1">
                        <Tag className="h-3 w-3 text-insurance-purple" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ContentPerformance;
