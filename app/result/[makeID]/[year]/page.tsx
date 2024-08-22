import { resultsInput } from "@/interfaces/interfaces";
import { VehicleData } from "@/helpers/fetch";
import Link from "next/link";

interface VehicleProps {
  params: resultsInput;
}

export default async function Vehicle({ params }: VehicleProps) {
  const vehicles = await VehicleData(params.makeID, params.year);

  return (
    <>
      <Link href="/" className="hover:underline">
        Return to home page
      </Link>
      <h1 className="text-center text-xl mt-10">Results of the search</h1>
      <p className="text-center italic text-sm">Id: {params.makeID}</p>
      <p className="text-center italic text-sm">Year: {params.year}</p>

      {vehicles.length > 0 ? (
        <ul className="grid grid-cols-4 gap-5 mt-10">
          {vehicles.map((vehicle) => (
            <li key={vehicle.id} className="bg-zinc-500 p-4 rounded-lg text-[#f5f5f5] shadow-sm">
              <strong>Car model:</strong> {vehicle.name}
              {vehicle.type && (
                <span>
                  - <strong>Type:</strong> {vehicle.type}
                </span>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No vehicles found for this make and year.</p>
      )}
    </>
  );
}
