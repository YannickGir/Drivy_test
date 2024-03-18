import { BiChevronDown } from "react-icons/bi";
import { useEffect, useState } from "react";
import { FormPropsInterface } from "../types/form.interface";

const Form: React.FC<FormPropsInterface> = ({ setDuration, setDistance }) => {
  const [kmselected, setKmSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const [days, setDays] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    handleSubmitForm();
  }, [days, kmselected]);

  const distanceTabGenerated = Array.from(
    { length: 60 },
    (_, index) => (index + 1) * 50
  );

  const handleInputChangeDays = (e) => {
    setDays(e.target.value);
    setError("");
  };

  const handleSubmitForm = () => {
    const daysValue = parseInt(days, 10);
    const isIntegerAndIsBetween1And30 =
      /^\d+$/.test(days) && daysValue >= 1 && daysValue <= 30;
    if (!isIntegerAndIsBetween1And30) {
      setError("Durée: Saisir un chiffre entier de 1 à 30 !");
      setDuration(0);
    } else if (!kmselected) {
      setError("Distance: Veuillez préciser le nombre de km.");
    } else {
      setError("");
      setDuration(daysValue);
      setDistance(kmselected);
    }
  };

  return (
    <div className=" pt-10 font-medium formRoot lg:fixed">
      <h3 className="pb-6 sm:text-2xl text-center">Entrez vos préférences</h3>
      <p className="pb-6 sm:text-1xl ">Durée de location souhaitée :</p>

      <input
        placeholder="Votre nombre de jours ?"
        className="w-full px-3 py-2 sm:text-1xl border rounded-md"
        type="number"
        value={days}
        onChange={handleInputChangeDays}
        min="1"
        max="30"
        required
      />
      <p className="pb-6 pt-6 sm:text-1xl ">Distance souhaitée :</p>
      <div
        onClick={() => setOpen(!open)}
        className={`bg-white w-full p-2 flex items-center justify-between border rounded ${
          !kmselected && "text-gray-400"
        }`}
      >
        {kmselected ? kmselected + " km" : "Sélectionnez votre distance"}
        <BiChevronDown size={20} className={`${open && "rotate-180"}`} />
      </div>
      <ul
        className={`bg-white mt-2 overflow-y-auto ${
          open ? "max-h-60" : "max-h-0"
        } `}
      >
        {distanceTabGenerated?.map((distance, index) => (
          <li
            key={index}
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
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Form;
