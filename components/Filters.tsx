"use client";
import React, { useEffect, useState } from "react";
import { getCars } from "@/helpers/fetch";
import { Car } from "@/interfaces/interfaces";

export const Filters = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [selectedCarName, setSelectedCarName] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");

  useEffect(() => {
    getCars().then((cars) => {
      setCars(cars);
    });
  }, []);

  const currentYear = new Date().getFullYear();
  const years = Array.from(new Array(currentYear - 2015 + 1), (val, index) => 2015 + index);


  const handleNameChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCarName(e.target.value);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí puedes manejar el envío del formulario
    console.log("Car Name:", selectedCarName);
    console.log("Car Name:", selectedYear);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded-md">
      <div className="mb-4">
        <label htmlFor="car-name" className="block text-sm font-medium text-gray-700">
          Select Car Name
        </label>
        <select
          id="car-name"
          value={selectedCarName}
          onChange={handleNameChange}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">Select a car name</option>
          {cars.map((car) => (
            <option key={car.id} value={car.name}>
              {car.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="model-year" className="block text-sm font-medium text-gray-700">
          Select Model Year
        </label>
        <select
          id="model-year"
          value={selectedYear}
          onChange={handleYearChange}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
        disabled={!selectedCarName || !selectedYear}
        className={`w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${!selectedCarName || !selectedYear ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
      >
        Submit
      </button>
    </form>
  );
};