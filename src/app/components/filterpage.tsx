'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { LoadingDots } from './LoadingDots';

export interface ICarMake {
  MakeId: number;
  MakeName: string;
  VehicleTypeId: number;
  VehicleTypeName: string;
}

export interface ICarMakeResponse {
  Count: number;
  Message: string;
  SearchCriteria: string;
  Results: ICarMake[];
}

const fetchMakes = async (vehicleType: string) => {
  const response = await fetch(
    `https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/${vehicleType}?format=json`,
  );
  const data: ICarMakeResponse = await response.json();
  return data.Results || [];
};

export function FilterPage() {
  const [vehicleType, setVehicleType] = useState('');
  const [modelYear, setModelYear] = useState('');
  const [makeID, setmakeID] = useState('');
  const [makes, setMakes] = useState<ICarMake[]>([]);
  const [availableYears, setAvailableYears] = useState<number[]>([]);
  const [nextWasPressed, setNextWasPressed] = useState(false);
  const [loadingMakes, setLoadingMakes] = useState(false);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 11 }, (_, i) => currentYear - i);
    setAvailableYears(years);
  }, []);

  const isNextDisabled = !vehicleType || !modelYear || nextWasPressed;

  const handleVehicleTypeChange = async (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const selectedVehicleType = e.target.value;
    setVehicleType(selectedVehicleType);
    setMakes([]);
    setLoadingMakes(true);

    if (selectedVehicleType) {
      try {
        const fetchedMakes = await fetchMakes(selectedVehicleType);
        setMakes(fetchedMakes);
      } catch (error) {
        console.error('Error fetching makes:', error);
      } finally {
        setLoadingMakes(false);
      }
    } else {
      setLoadingMakes(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="max-w-64 sm:max-w-full sm:w-80 lg:w-96 p-6 border rounded-lg shadow bg-gray-800 border-gray-700">
        <div className="mb-4">
          <h2 className="text-2xl font-semibold tracking-tight text-white">
            Search for the cars you like
          </h2>
          <p className="text-gray-400">
            Make sure to fill all the required inputs
          </p>
        </div>

        <div className="mb-4">
          <label htmlFor="vehicleType" className="block text-lg font-medium">
            Select Vehicle Type <span className="text-red-400">*</span>
          </label>
          <select
            id="vehicleType"
            className="w-full  mt-2 p-2 border rounded-md hover:cursor-pointer text-sm bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500 font-sans"
            onChange={handleVehicleTypeChange}
            value={vehicleType}
          >
            <option value="">
              Select Type
            </option>
            <option value="car">
              Car
            </option>
            <option value="truck">
              Truck
            </option>
            <option value="motorcycle">
              Motorcycle
            </option>
          </select>
        </div>

        <div className="mb-4 relative">
          <label
            htmlFor="make"
            className={`block text-lg font-medium ${
              loadingMakes || !makes.length ? 'text-gray-400' : ''
            }`}
          >
            Select Make <span className="text-red-400">*</span>
          </label>
          <select
            id="make"
            className={`font-sans w-full mt-2 p-2 border rounded-md text-sm bg-gray-700 border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 ${
              loadingMakes || !makes.length
                ? 'text-gray-400'
                : 'hover:cursor-pointer'
            }`}
            onChange={(e) => setmakeID(e.target.value)}
            disabled={loadingMakes || !makes.length}
          >
            <option value="">
              {loadingMakes ? '' : 'Select Make'}
            </option>
            {makes.map((make) => (
              <option
              
                key={make.MakeId}
                value={make.MakeId}
              >
                {make.MakeName}
              </option>
            ))}
          </select>
          {loadingMakes && (
            <LoadingDots
              className="absolute bottom-0 left-2"
              dotsColor="bg-white"
            />
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="modelYear" className="block text-lg font-medium">
            Select Model Year <span className="text-red-400">*</span>
          </label>
          <select
            id="modelYear"
            className="font-sans w-full mt-2 p-2 border rounded-md  hover:cursor-pointer text-sm bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
            onChange={(e) => setModelYear(e.target.value)}
            value={modelYear}
          >
            <option value="">
              Select Year
            </option>
            {availableYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <Link href={`/result/${makeID}/${modelYear}`}>
          <button
            onClick={() => setNextWasPressed(true)}
            className={`w-full border focus:outline-none focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-gray-800 border-gray-600 focus:ring-gray-700 ${
              isNextDisabled
                ? 'bg-gray-400 text-gray-500'
                : 'hover:bg-gray-700 hover:border-gray-600 cursor-pointer text-white'
            }`}
            disabled={isNextDisabled}
          >
            {nextWasPressed ? 'Redirecting' : 'Next'}
          </button>
        </Link>
      </div>
    </div>
  );
}
