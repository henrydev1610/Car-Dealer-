import { Suspense } from "react";
import { Car } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import VehicleResults from "./vehicle-results";

interface ResultPageProps {
  params: {
    makeId: string;
    year: string;
  };
}

export async function generateStaticParams() {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2014 }, (_, i) => currentYear - i);
  
  const response = await fetch(
    "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json"
  );
  const data = await response.json();
  const makes = data.Results;

  const params = [];
  for (const make of makes) {
    for (const year of years) {
      params.push({
        makeId: make.MakeId.toString(),
        year: year.toString(),
      });
    }
  }

  return params;
}

export default function ResultPage({ params }: ResultPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <Car className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-primary">Car Dealer App</h1>
          </div>
          <Link href="/">
            <Button variant="outline">Back to Search</Button>
          </Link>
        </div>

        <Suspense fallback={<div className="text-center">Loading vehicles...</div>}>
          <VehicleResults makeId={params.makeId} year={params.year} />
        </Suspense>
      </div>
    </div>
  );
}