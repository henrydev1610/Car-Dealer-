"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface Vehicle {
  Make_ID: number;
  Make_Name: string;
  Model_ID: number;
  Model_Name: string;
}

interface VehicleResultsProps {
  makeId: string;
  year: string;
}

export default function VehicleResults({ makeId, year }: VehicleResultsProps) {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch(
          `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
        );
        const data = await response.json();
        setVehicles(data.Results);
      } catch (error) {
        setError("Failed to fetch vehicles. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, [makeId, year]);

  if (error) {
    return (
      <div className="text-center text-destructive p-4">
        <p>{error}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <Skeleton className="h-6 w-3/4 mb-4" />
              <Skeleton className="h-4 w-1/2" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (vehicles.length === 0) {
    return (
      <div className="text-center p-4">
        <p>No vehicles found for the selected criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {vehicles.map((vehicle) => (
        <Card
          key={vehicle.Model_ID}
          className="bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-colors"
        >
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-2">{vehicle.Model_Name}</h3>
            <p className="text-muted-foreground">{vehicle.Make_Name}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}