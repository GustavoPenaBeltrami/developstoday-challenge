import { getCars } from "@/helpers/fetch";
import { Car } from "@/interfaces/interfaces";


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
