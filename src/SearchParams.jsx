import { useState, useEffect } from "react";
const ANIMALS = ["animal1", "dog", "cat"];
import Pet from "./component.jsx";

const SearchParams = () => {
  //const location = "New York, Indonesia";
  const [location, setLocation] = useState("New York, USA");
  const [animal, setAnimal] = useState("");
  const [pets, setPets] = useState([]);

  useEffect(() => {
    requestPets();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps
  //empty array means it is called once; no argument there would cause it to be called every time any state variable changed.

  async function requestPets() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animals=${animal}&location=${location}`
    );
    const json = await res.json();
    setPets(json.pets);
  }

  return (
    <div className="search-params">
      {
        //console.log(location)
      }
      <form>
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={location}
            placeholder="Location"
            onChange={(event) => setLocation(event.target.value)}
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            name="animalList"
            id="animal"
            value={animal}
            onChange={(e) => {
              setAnimal(e.target.value);
            }}
            onBlur={(e) => {
              setAnimal(e.target.value);
            }}
          >
            <option />
            {ANIMALS.map(
              (animal) => (
                <option key={animal} value={animal}>
                  {animal}
                </option>
              ) //this is an implicit return function because normal brackets are used for the function
            )}
          </select>
        </label>
        <button>Submit</button>
      </form>
      {pets.map((pet) => (
        <Pet name={pet.name} animal={pet.animal} key={pet.id} />
      ))}
    </div>
  );
};

export default SearchParams;
