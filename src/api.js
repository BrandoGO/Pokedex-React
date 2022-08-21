export const searchPokemon = async (pokemon) => {
  try {
    let URL = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  } catch (error) {}
};

//limit = cantidad de pokemones que quiero obtener del API
//offset = Cantidad de pokemones al cual queremos empezar a buscar
export const getPokemons = async (limit = 27, offset = 0) => {
  try {
    let URL = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  } catch (error) {}
};

export const getPokemonData = async (URL) => {
  try {
    
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("error")
  }
}