import { useEffect, useState } from "react";
import CarList from "./Components/CarList";
import { Car } from "./types/car.interface";
import Form from "./Components/Form";

export default function MyApp() {
  const [cars, setCars] = useState<Array<Car>>([]);
  const [duration, setDuration] = useState<number>(0);
  const [distance, setDistance] = useState<number>(0);
  useEffect(() => {
    const fetchData = async () => {
      console.log(duration, distance);

      try {
        const response = await fetch(
          `http://localhost:3000/cars?duration=${duration}&distance=${distance}`
        );
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
  }, [duration, distance]);

  return (
    <>
      <div className="h-10 mb-10 flex items-center justify-center">
        <h1 className="text-4xl text-black">
          Welcome to the Drivy plateform !
        </h1>
      </div>
      <div className="bottom-0 left-0 relative flex justify-center">
        <Form setDuration={setDuration} setDistance={setDistance} />
        <CarList cars={cars} distance={distance} duration={duration} />
      </div>
    </>
  );
}
