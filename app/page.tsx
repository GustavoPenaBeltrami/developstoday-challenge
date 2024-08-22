interface Car {
  id: number;
  name: string;
  typeId: number;
  type: string;
}

async function getCars(): Promise<Car[]> {
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

export default async function Home() {
  const cars: Car[] = await getCars();

  return (
    <>
      {cars.map((car) => (
        <div className="mb-4" key={car.id}>
          <p>ID: {car.id}</p>
          <p>NAME: {car.name}</p>
          <p>TypeId: {car.typeId}</p>
          <p>Type: {car.type}</p>
        </div>
      ))}
    </>
  );
}
