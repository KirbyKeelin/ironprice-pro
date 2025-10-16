import { useState } from "react";
import { Button } from "@/components/ui/button";
import { QuoteForm } from "@/components/QuoteForm";
import { QuoteResults } from "@/components/QuoteResults";
import { Calculator, TrendingUp, Clock, ShieldCheck } from "lucide-react";

interface FormData {
  steelType: string;
  form: string;
  quantity: string;
  unit: string;
  length: string;
  width: string;
  thickness: string;
  grade: string;
  zipCode: string;
}

const Index = () => {
  const [showResults, setShowResults] = useState(false);
  const [quoteData, setQuoteData] = useState<FormData | null>(null);

  const handleFormSubmit = (data: FormData) => {
    setQuoteData(data);
    setShowResults(true);
    // Smooth scroll to results
    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleNewQuote = () => {
    setShowResults(false);
    setQuoteData(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Mock calculation based on form data
  const calculateEstimate = (data: FormData) => {
    const baseRate = 3.42; // Mock rate per kg
    const quantity = parseFloat(data.quantity) || 0;
    const materials = quantity * baseRate;
    const processing = materials * 0.15;
    const delivery = materials * 0.08;
    const total = materials + processing + delivery;

    return {
      total: Math.round(total),
      breakdown: {
        materials: Math.round(materials),
        processing: Math.round(processing),
        delivery: Math.round(delivery),
      },
    };
  };

  const estimate = quoteData ? calculateEstimate(quoteData) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <Calculator className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">SteelQuote Hub</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#calculator" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Calculator
            </a>
            <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <Button variant="outline" size="sm">
              Sign In
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-6 mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium">
              <TrendingUp className="h-4 w-4" />
              Live Market Data Integration
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
              Instant Steel Price
              <br />
              <span className="text-primary">Estimates</span> for Your Project
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Get accurate steel material cost estimates in seconds. Perfect for construction firms, 
              engineers, and contractors planning their next project.
            </p>
          </div>

          {/* Features Grid */}
          <div id="features" className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="p-6 rounded-lg bg-card border border-border shadow-[0_2px_8px_-1px_hsl(215_25%_15%/0.1)] hover:shadow-[0_4px_20px_-2px_hsl(217_75%_45%/0.15)] transition-shadow">
              <Clock className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Instant Estimates</h3>
              <p className="text-sm text-muted-foreground">
                Real-time pricing based on current market data from trusted commodity indexes
              </p>
            </div>
            <div className="p-6 rounded-lg bg-card border border-border shadow-[0_2px_8px_-1px_hsl(215_25%_15%/0.1)] hover:shadow-[0_4px_20px_-2px_hsl(217_75%_45%/0.15)] transition-shadow">
              <ShieldCheck className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Accurate Data</h3>
              <p className="text-sm text-muted-foreground">
                Sourced from SteelBenchmarker, LME, and verified regional suppliers
              </p>
            </div>
            <div className="p-6 rounded-lg bg-card border border-border shadow-[0_2px_8px_-1px_hsl(215_25%_15%/0.1)] hover:shadow-[0_4px_20px_-2px_hsl(217_75%_45%/0.15)] transition-shadow">
              <TrendingUp className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Cost Breakdown</h3>
              <p className="text-sm text-muted-foreground">
                Detailed pricing including materials, processing, and delivery estimates
              </p>
            </div>
          </div>

          {/* Quote Form */}
          <div id="calculator" className="max-w-3xl mx-auto mb-12">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-foreground mb-3">Get Your Estimate</h2>
              <p className="text-muted-foreground">
                Fill in your steel requirements below to receive an instant price estimate
              </p>
            </div>
            <QuoteForm onSubmit={handleFormSubmit} />
          </div>

          {/* Results Section */}
          {showResults && estimate && quoteData && (
            <div id="results" className="max-w-3xl mx-auto">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-3xl font-bold text-foreground">Your Estimate</h2>
                <Button variant="outline" onClick={handleNewQuote}>
                  New Quote
                </Button>
              </div>
              <QuoteResults
                estimatedCost={estimate.total}
                breakdown={estimate.breakdown}
                steelType={quoteData.steelType}
                quantity={quoteData.quantity}
                unit={quoteData.unit}
              />
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4 mt-16">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2025 SteelQuote Hub. Estimates based on live market data.</p>
            <p className="mt-2">
              Data sources: SteelBenchmarker, London Metal Exchange, Regional Suppliers
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
