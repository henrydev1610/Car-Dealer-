"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Car } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Make {
  MakeId: number;
  MakeName: string;
}

export default function Home() {
  const router = useRouter();
  const [makes, setMakes] = useState<Make[]>([]);
  const [selectedMake, setSelectedMake] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2014 },
    (_, i) => currentYear - i
  );

  useEffect(() => {
    const fetchMakes = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL; // Acessando a variável de ambiente para a URL
        const response = await fetch(apiUrl);
        const data = await response.json();
        setMakes(data.Results);
      } catch (error) {
        console.error("Error fetching makes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMakes();
  }, []);

  const handleNext = () => {
    if (selectedMake && selectedYear) {
      router.push(`/result/${selectedMake}/${selectedYear}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center mb-8 space-x-3">
          <Car className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold text-primary">Car Dealer App</h1>
        </div>

        <Card className="bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-center">Find Your Perfect Car</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Make</label>
                <Select
                  value={selectedMake}
                  onValueChange={(value) => setSelectedMake(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a make" />
                  </SelectTrigger>
                  <SelectContent>
                    {makes.map((make) => (
                      <SelectItem key={make.MakeId} value={make.MakeId.toString()}>
                        {make.MakeName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Select Year</label>
                <Select
                  value={selectedYear}
                  onValueChange={(value) => setSelectedYear(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a year" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-center">
              <Button
                size="lg"
                onClick={handleNext}
                disabled={!selectedMake || !selectedYear}
              >
                Next
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
