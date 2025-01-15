import { LoadingDots } from '@/app/components/LoadingDots';
import Link from 'next/link';
import { Suspense } from 'react';

type Params = {
  makeId: string;
  year: string;
};

interface ICarModel {
  Make_ID: number;
  Make_Name: string;
  Model_ID: number;
  Model_Name: string;
  Model_Year: string;
}

interface ICarModelResponse {
  Count: number;
  Message: string;
  SearchCriteria: string;
  Results: ICarModel[];
}

const getCarModels = async (
  makeId: string,
  year: string,
): Promise<ICarModel[] | null> => {
  try {
    const response = await fetch(
      `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`,
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch vehicle models: ${response.statusText}`);
    }
    const data: ICarModelResponse = await response.json();
    return data.Results || [];
  } catch (error) {
    console.error('Error fetching vehicle models:', error);
    return null;
  }
};

const getMakes = async (): Promise<string[]> => {
  try {
    const response = await fetch(
      'https://vpic.nhtsa.dot.gov/api/vehicles/getAllMakes?format=json',
    );
    if (!response.ok) {
      throw new Error('Failed to fetch makes.');
    }
    const data = await response.json();
    return data.Results.map((make: { Make_Name: string }) => make.Make_Name);
  } catch (error) {
    console.error('Error fetching makes:', error);
    return [];
  }
};

export const generateStaticParams = async () => {
  const makes = await getMakes();

  const currentYear = new Date().getFullYear();
  const startYear = 2015;
  const endYear = Math.min(currentYear, 2024);

  const years = Array.from({ length: endYear - startYear + 1 }, (_, i) =>
    (startYear + i).toString(),
  );

  const staticParams = makes.flatMap((make) =>
    years.map((year) => ({
      makeId: make,
      year: year,
    })),
  );

  return staticParams.map(({ makeId, year }) => ({
    params: { makeId, year },
  }));
};

export default async function ResultPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const resolvedParams = await params;
  const { makeId, year } = resolvedParams;

  const models = await getCarModels(makeId, year);

  if (!models) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <div className="w-full my-10 max-w-sm p-6 border rounded-lg shadow bg-gray-800 border-gray-700">
          <p className="text-red-400">
            Failed to fetch vehicle models. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  if (models.length === 0) {
    return (
      <main className="min-h-screen flex flex-col justify-center items-center">
        <div className="w-full my-10 max-w-sm p-6 border rounded-lg shadow bg-gray-800 border-gray-700">
          <Link href="/">
            <button className="border focus:outline-none focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-gray-800 text-white border-gray-600 focus:ring-gray-700 hover:bg-gray-700 hover:border-gray-600 cursor-pointer">
              {'Go back'}
            </button>
          </Link>
          <p className="text-lg text-gray-400">
            Oops! We couldn&apos;t find any vehicle models for{' '}
            <span className="font-semibold text-emerald-400">
              {models.length === 0 ? 'this make' : 'this selection'}
            </span>{' '}
            in the year{' '}
            <span className="font-semibold text-emerald-400">{year}</span>. Try
            a different make and year combination or come back later!
          </p>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="w-[80%] sm:w-[30rem] border rounded-lg shadow bg-gray-800 border-gray-700 p-6 my-6">
        <Link href="/">
          <button className="border focus:outline-none focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-gray-800 text-white border-gray-600 focus:ring-gray-700 hover:bg-gray-700 hover:border-gray-600 cursor-pointer">
            {'Go back'}
          </button>
        </Link>
        <div className="flex flex-row justify-center mb-6 gap-4">
          <h1 className="text-5xl font-extrabold text-center">
            Discover{' '}
            <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-blue-400 to-purple-600 animate-pulse">
              {models.length > 0 ? models[0].Make_Name : 'Top Makes'}
            </span>{' '}
            Models from{' '}
            <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-blue-400 to-purple-600 animate-pulse">
              {year}
            </span>
          </h1>
        </div>

        {models.length > 0 ? (
          <Suspense fallback={<LoadingDots dotsColor="bg-white" />}>
            <ul className="p-4 cursor-default select-none overflow-y-scroll max-h-96 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-300">
              {models.map((model, key) => (
                <li
                  key={key}
                  className="py-3 px-4 mb-3 bg-slate-700 border shadow-lg border-slate-600 rounded-md hover:bg-slate-600 transition-colors"
                >
                  <p className="text-lg text-sky-400">
                    <span className="font-bold text-white">Model: </span>
                    <span className="italic text-emerald-400">
                      {model.Model_Name}
                    </span>
                  </p>
                </li>
              ))}
            </ul>
          </Suspense>
        ) : (
          <p className="text-lg text-gray-600">
            No models found for this selection.
          </p>
        )}
      </div>
    </div>
  );
}
