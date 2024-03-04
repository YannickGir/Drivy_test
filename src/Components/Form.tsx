import { BiChevronDown } from "react-icons/bi";
import { useState } from "react";
interface FormProps {
  setDuration: (value: number) => void;
  setDistance: (value: number) => void;
}

const Form: React.FC<FormProps> = ({ setDuration, setDistance }) => {
  const [kmselected, setKmSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const [days, setDays] = useState("");
  const [error, setError] = useState("");

  const generateMultiplesOf50 = () =>
    Array.from({ length: 60 }, (_, index) => (index + 1) * 50);

  const distanceTab = generateMultiplesOf50();

  const handleInputChange = (e) => {
    setDays(e.target.value);
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const daysValue = parseInt(days, 10);

    if (isNaN(daysValue) || daysValue < 1 || daysValue > 30) {
      setError("Veuillez indiquer le nombre de jours.");
    } else if (!kmselected) {
      setError("Veuillez préciser le nombre de km.");
    } else {
      setError("");
      setDuration(daysValue);
      setDistance(kmselected);
    }
  };
  return (
    <div className="w-72 font-medium h-80">
      <p>Durée de location souhaitée :</p>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="indiquez le nombre de jours"
          type="number"
          value={days}
          onChange={handleInputChange}
          min="1"
          max="30"
        />
        <p>Distance souhaitée :</p>
        <div
          onClick={() => setOpen(!open)}
          className={`bg-white w-full p-2 flex items-center justify-between rounded ${
            !kmselected && "text-gray-700"
          }`}
        >
          {kmselected ? kmselected + " km" : "Sélectionnez la distance"}
          <BiChevronDown size={20} className={`${open && "rotate-180"}`} />
        </div>
        <ul
          className={`bg-white mt-2 overflow-y-auto ${
            open ? "max-h-60" : "max-h-0"
          } `}
        >
          {distanceTab?.map((distance) => (
            <li
              key={distance}
              className={`p-2 text-sm hover:bg-sky-300 hover:text-white
                ${distance === kmselected && "bg-sky-300 text-white"}
                `}
              onClick={() => {
                if (distance !== kmselected) {
                  setKmSelected(distance);
                  setOpen(false);
                }
              }}
            >
              {distance} km
            </li>
          ))}
        </ul>

        <br />
        <button
          type="submit"
          className="bg-blue-300 hover:bg-blue-400 text-black py-1 px-3 rounded"
        >
          Soumettre
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default Form;
