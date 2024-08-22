import { Filters } from "@/components/Filters";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="text-center w-full">
      <h1 className="text-2xl mb-2">Devops Today</h1>
      <h2 className="text-lg">
        Full-Stack JS engineer test assessment - the Car Dealer App
      </h2>

      <Filters />
    </div>
  );
}
