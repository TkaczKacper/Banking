async function fetchBreedList({ queryKey }) {
     const animal = queryKey[1];

     if (!animal) return [];

     const result = await fetch(
          `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
     );

     if (!result.ok) {
          throw new Error(`breeds ${animal} fetch not ok`);
     }

     return result.json();
}

export default fetchBreedList;
