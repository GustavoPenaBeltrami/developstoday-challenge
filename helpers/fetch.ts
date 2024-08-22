import { Car } from "@/interfaces/interfaces";

export async function getCars(): Promise<Car[]> {
  try {
    const response = await fetch(
      "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json"
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (!Array.isArray(data.Results)) {
      throw new Error("Invalid data format: 'Results' is not an array");
    }

    const cars: Car[] = data.Results.map((car: any) => {
      return {
        id: car.MakeId,
        name: car.MakeName,
        typeId: car.VehicleTypeId,
        type: car.VehicleTypeName,
      };
    });

    return cars;
  } catch (error) {
    console.error("Error fetching car data:", error);
    throw error;
  }
}

export async function VehicleData(makeID: string, year: string): Promise<Car[]> {
  try {
    const response = await fetch(
      `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeID}/modelyear/${year}?format=json`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    const cars: Car[] = data.Results.map((car: any) => {
      return {
        id: car.Model_ID,
        name: car.Model_Name,
        typeId: car.VehicleTypeId,
        type: car.VehicleTypeName,
      };
    });

    return cars;
  } catch (error) {
    console.error("Error fetching vehicle data:", error);
    throw error;
  }
}