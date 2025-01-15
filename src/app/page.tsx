import { FilterPage } from './components/filterpage';

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex flex-col gap-8">
          <h1 className="text-4xl font-semibold text-center">Car Dealer App</h1>
          <FilterPage />
        </div>
      </main>

      <footer className="row-start-3 flex flex-col gap-4 items-center justify-center text-center text-gray-500">
        <div className="text-sm">
          <p>
            © {new Date().getFullYear()} Car Dealer App. All rights reserved.
          </p>
        </div>
        <div className="flex gap-6 mt-2">
          <a href="#" className="text-blue-500 hover:text-blue-700">
            Privacy Policy
          </a>
          <a href="#" className="text-blue-500 hover:text-blue-700">
            Terms of Service
          </a>
          <a href="#" className="text-blue-500 hover:text-blue-700">
            Contact
          </a>
        </div>
      </footer>
    </div>
  );
}
