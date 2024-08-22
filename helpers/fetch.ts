import { Car } from "@/interfaces/interfaces";

export async function getCars(): Promise<Car[]> {
  const response = await fetch(
    "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json"
  );
  const data = await response.json();

  const cars: Car[] = data.Results.map((car: any) => {
    return {
      id: car.MakeId,
      name: car.MakeName,
      typeId: car.VehicleTypeId,
      type: car.VehicleTypeName,
    };
  });

  return cars;
}
