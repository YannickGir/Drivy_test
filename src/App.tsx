import { useEffect, useState } from "react";
import CarList from "./Components/CarList";
import { Car } from "./types/car.interface";
import Form from "./Components/Form";
import WindowSizeViewer from "./Components/WindowsSizeViewer";

export default function MyApp() {
  const [cars, setCars] = useState<Array<Car>>([]);
  const [duration, setDuration] = useState<number>(0);
  const [distance, setDistance] = useState<number>(0);

  const PORT = process.env.PORT || 3000;
  useEffect(() => {
    const fetchData = async () => {
      console.log(duration, distance);

      try {
        const response = await fetch(
          `http://localhost:${PORT}/cars?duration=${duration}&distance=${distance}`
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
    <div>
        <div className=" header flex h-screen">
            {/* <WindowSizeViewer/> */}
            <h1 className="mx-auto pt-3 text-1xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold" >
        Welcome to the Drivy platform!
      </h1>
        </div>
      
      <div className="flex flex-col lg:flex-row">
        <div className="w-full mx-auto lg:w-1/5  p-4">
          <Form setDuration={setDuration} setDistance={setDistance} />
        </div>
        <div className="w-full mx-auto lg:w-4/5  p-4">
          <CarList cars={cars} distance={distance} duration={duration} />
        </div>
      </div>
    </div>
  );
}
