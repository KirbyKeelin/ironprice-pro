import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calculator, ChevronRight } from "lucide-react";

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

interface QuoteFormProps {
  onSubmit: (data: FormData) => void;
}

export const QuoteForm = ({ onSubmit }: QuoteFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    steelType: "",
    form: "",
    quantity: "",
    unit: "kg",
    length: "",
    width: "",
    thickness: "",
    grade: "",
    zipCode: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="p-6 md:p-8 shadow-[0_2px_8px_-1px_hsl(215_25%_15%/0.1)]">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="steelType">Type of Steel</Label>
          <Select value={formData.steelType} onValueChange={(val) => updateField("steelType", val)}>
            <SelectTrigger id="steelType">
              <SelectValue placeholder="Select steel type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="stainless">Stainless Steel</SelectItem>
              <SelectItem value="carbon">Carbon Steel</SelectItem>
              <SelectItem value="alloy">Alloy Steel</SelectItem>
              <SelectItem value="structural">Structural Steel</SelectItem>
              <SelectItem value="rebar">Rebar</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="form">Form/Shape</Label>
          <Select value={formData.form} onValueChange={(val) => updateField("form", val)}>
            <SelectTrigger id="form">
              <SelectValue placeholder="Select form" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sheet">Sheet</SelectItem>
              <SelectItem value="beam">Beam</SelectItem>
              <SelectItem value="rod">Rod</SelectItem>
              <SelectItem value="coil">Coil</SelectItem>
              <SelectItem value="plate">Plate</SelectItem>
              <SelectItem value="pipe">Pipe</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              placeholder="500"
              value={formData.quantity}
              onChange={(e) => updateField("quantity", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="unit">Unit</Label>
            <Select value={formData.unit} onValueChange={(val) => updateField("unit", val)}>
              <SelectTrigger id="unit">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kg">Kilograms (kg)</SelectItem>
                <SelectItem value="tons">Tons</SelectItem>
                <SelectItem value="lbs">Pounds (lbs)</SelectItem>
                <SelectItem value="meters">Meters</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="length">Length (mm)</Label>
            <Input
              id="length"
              type="number"
              placeholder="1000"
              value={formData.length}
              onChange={(e) => updateField("length", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="width">Width (mm)</Label>
            <Input
              id="width"
              type="number"
              placeholder="500"
              value={formData.width}
              onChange={(e) => updateField("width", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="thickness">Thickness (mm)</Label>
            <Input
              id="thickness"
              type="number"
              placeholder="3"
              value={formData.thickness}
              onChange={(e) => updateField("thickness", e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="grade">Grade/Standard</Label>
          <Select value={formData.grade} onValueChange={(val) => updateField("grade", val)}>
            <SelectTrigger id="grade">
              <SelectValue placeholder="Select grade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="304ss">304 Stainless Steel</SelectItem>
              <SelectItem value="316ss">316 Stainless Steel</SelectItem>
              <SelectItem value="a36">ASTM A36</SelectItem>
              <SelectItem value="a572">ASTM A572</SelectItem>
              <SelectItem value="a992">ASTM A992</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="zipCode">ZIP Code / Region</Label>
          <Input
            id="zipCode"
            placeholder="Enter your ZIP code"
            value={formData.zipCode}
            onChange={(e) => updateField("zipCode", e.target.value)}
          />
        </div>

        <Button type="submit" className="w-full" size="lg" variant="hero">
          <Calculator className="mr-2 h-5 w-5" />
          Calculate Estimate
          <ChevronRight className="ml-2 h-5 w-5" />
        </Button>
      </form>
    </Card>
  );
};
