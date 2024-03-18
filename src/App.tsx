import { useState } from "react";
import CarList from "./Components/CarList";
import Form from "./Components/Form";
import WindowSizeViewer from "./Components/WindowsSizeViewer";

export default function MyApp() {
  const [duration, setDuration] = useState<number>(0);
  const [distance, setDistance] = useState<number>(0);

  return (
    <div>
      <div className=" header flex h-screen">
        {/* <WindowSizeViewer/> */}
        <h1 className="mx-auto pt-3 text-1xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold">
          Welcome to the Drivy platform!
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row">
        <div className="w-full mx-auto lg:w-1/5  p-4">
          <div className="w-full lg:w-auto">
            <Form setDuration={setDuration} setDistance={setDistance} />
          </div>
        </div>
        <div className="w-full mx-auto lg:w-4/5  p-4">
          <CarList distance={distance} duration={duration} />
        </div>
      </div>
    </div>
  );
}
