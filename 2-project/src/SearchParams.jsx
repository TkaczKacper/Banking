import { useState, useEffect } from "react";
import Pet from "./Pet";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
     const [location, setLocation] = useState("");
     const [animal, setAnimal] = useState("");
     const [breed, setBreed] = useState("");
     const [pets, setPets] = useState([]);
     const breeds = [];

     useEffect(() => {
          requestPets();
     }, []);

     async function requestPets() {
          const result = await fetch(
               `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
          );
          const json = await result.json();

          setPets(json.pets);
     }

     return (
          <div className="search-params">
               <form
                    onSubmit={(e) => {
                         e.preventDefault();
                         requestPets();
                    }}
               >
                    <label htmlFor="location">
                         Location
                         <input
                              onChange={(e) => setLocation(e.target.value)}
                              id="location"
                              value={location}
                              placeholder="location"
                         ></input>
                    </label>
                    <label htmlFor="animal">
                         Animal
                         <select
                              id="animal"
                              value={animal}
                              onChange={(e) => {
                                   setAnimal(e.target.value);
                                   setBreed("");
                              }}
                         >
                              {ANIMALS.map((animal) => (
                                   <option key={animal}>{animal}</option>
                              ))}
                         </select>
                    </label>
                    <label htmlFor="breed">
                         Breed
                         <select
                              id="breed"
                              disabled={breed.length === 0}
                              value={breed}
                              onChange={(e) => setBreed(e.target.value)}
                         >
                              {breeds.map((breed) => (
                                   <option key={breed}>{breed}</option>
                              ))}
                         </select>
                    </label>
                    <button>Submit</button>
               </form>
               {pets.map((pet) => (
                    <Pet
                         name={pet.name}
                         animal={pet.animal}
                         breed={pet.breed}
                         key={pet.id}
                    />
               ))}
          </div>
     );
};

export default SearchParams;
