"use client";
import React, { useEffect, useState } from "react";
import { getCars } from "@/helpers/fetch";
import { Car } from "@/interfaces/interfaces";
import { useRouter } from "next/navigation";

export const Filters = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [selectedCarMakeId, setSelectedCarMakeId] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true); // Estado de carga

  const route = useRouter();

  // Obtener el año actual
  const currentYear = new Date().getFullYear();
  const years = Array.from(new Array(currentYear - 2015 + 1), (val, index) => 2015 + index);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const cars = await getCars();
        setCars(cars);
      } catch (error) {
        console.error("Error fetching car data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const handleNameChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCarMakeId(e.target.value);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ve a result/[makeId]/[year].
    route.push(`/result/${selectedCarMakeId}/${selectedYear}`);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded-md max-w-[1000px] mx-auto w-[90%] mt-10">
      {loading ? (
        <div>Loading cars...</div>
      ) : (
        <>
          <div className="mb-4">
            <label htmlFor="car-name" className="block text-sm font-medium text-black">
              Select Car Name
            </label>
            <select
              id="car-name"
              value={selectedCarMakeId}
              onChange={handleNameChange}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-zinc-500 focus:border-zinc-500 sm:text-sm"
            >
              <option value="">Select a car name</option>
              {cars.map((car) => (
                <option key={car.id} value={car.id}>
                  {car.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="model-year" className="block text-sm font-medium text-black">
              Select Model Year
            </label>
            <select
              id="model-year"
              value={selectedYear}
              onChange={handleYearChange}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-zinc-500 focus:border-zinc-500 sm:text-sm"
            >
              <option value="">Select a model year</option>
              {years.map((year) => (
                <option key={year} value={year.toString()}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={!selectedCarMakeId || !selectedYear}
            className={`w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${!selectedCarMakeId || !selectedYear ? 'bg-gray-300' : 'bg-zinc-800 hover:bg-zinc-900'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500`}
          >
            Submit
          </button>
        </>
      )}
    </form>
  );
};
