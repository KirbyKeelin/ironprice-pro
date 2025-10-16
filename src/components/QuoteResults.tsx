import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, TrendingUp, MapPin, Clock } from "lucide-react";

interface QuoteResultsProps {
  estimatedCost: number;
  breakdown: {
    materials: number;
    processing: number;
    delivery: number;
  };
  steelType: string;
  quantity: string;
  unit: string;
}

export const QuoteResults = ({ estimatedCost, breakdown, steelType, quantity, unit }: QuoteResultsProps) => {
  const confidence = 85; // Mock confidence level
  const dataSource = "SteelBenchmarker & LME Data";
  const lastUpdated = "October 15, 2025";

  return (
    <div className="space-y-6">
      {/* Main Estimate Card */}
      <Card className="p-6 md:p-8 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 shadow-[0_4px_20px_-2px_hsl(217_75%_45%/0.15)]">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <CheckCircle className="h-4 w-4" />
            Estimate Ready
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground mb-2">Estimated Total Cost</p>
            <p className="text-5xl font-bold text-foreground">
              ${estimatedCost.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              for {quantity} {unit} of {steelType}
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <TrendingUp className="h-4 w-4 text-primary" />
            <span>{confidence}% confidence level</span>
          </div>
        </div>
      </Card>

      {/* Cost Breakdown */}
      <Card className="p-6 shadow-[0_2px_8px_-1px_hsl(215_25%_15%/0.1)]">
        <h3 className="text-lg font-semibold mb-4">Cost Breakdown</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center pb-3 border-b border-border">
            <span className="text-muted-foreground">Base Materials</span>
            <span className="font-semibold">${breakdown.materials.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-border">
            <span className="text-muted-foreground">Processing & Cutting</span>
            <span className="font-semibold">${breakdown.processing.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-border">
            <span className="text-muted-foreground">Delivery & Freight</span>
            <span className="font-semibold">${breakdown.delivery.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center pt-2">
            <span className="font-bold">Total Estimate</span>
            <span className="text-xl font-bold text-primary">${estimatedCost.toLocaleString()}</span>
          </div>
        </div>
      </Card>

      {/* Data Source Info */}
      <Card className="p-6 bg-secondary/50 shadow-[0_2px_8px_-1px_hsl(215_25%_15%/0.1)]">
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <Clock className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <p className="text-sm font-medium">Data Source</p>
              <p className="text-sm text-muted-foreground">
                Based on {dataSource}, updated {lastUpdated}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <p className="text-sm font-medium">Regional Pricing</p>
              <p className="text-sm text-muted-foreground">
                Includes average freight costs and regional market adjustments
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button variant="accent" size="lg" className="w-full">
          Request Formal Quote
        </Button>
        <Button variant="outline" size="lg" className="w-full">
          Find Nearby Suppliers
        </Button>
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-center text-muted-foreground">
        * This is an estimate based on current market data. Actual prices may vary based on supplier, 
        availability, and specific project requirements. For binding quotes, please contact suppliers directly.
      </p>
    </div>
  );
};
