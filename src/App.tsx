import { useEffect, useState } from "react";
import CarList from "./Components/CarList";
import { Car } from "./types/car.interface";


export default function MyApp() {
  const [cars, setCars] = useState<Array<Car>>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/cars");
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données");
        }
        const data = await response.json();
        setCars(data);
      } catch (error) {
        console.error("Error when trying to fetch:", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="h-10 mb-10 flex items-center justify-center">
        <h1 className="text-4xl text-black">
          Welcome to the Drivy plateform !
        </h1>
      </div>
      <div className="bottom-0 left-0">
        <CarList cars={cars} />
      </div>
    </>
  );
}
