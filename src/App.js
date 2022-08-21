//Importaciones de variables, librerias y archivos
import React from "react";
import Navbar from "./Componentes/Navbar";
import Searchbar from "./Componentes/Searchbar";
import "./Estilos.css";
import Pokedex from "./Componentes/Pokedex";
import { getPokemonData, getPokemons, searchPokemon } from "./api";
import { FavoriteProvider } from "./Context/favoriteContext";

//Hooks = variables reutilizables
//useState = actualiza la vista
//useEffect = Ejecuta codigo basado en efectos o cualquier cambio que ocurra dentro de un estado
const { useState, useEffect } = React;

const localStorageKey = "favorite_pokemon";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [searching, setSearching] = useState(false);

  const fetchPokemons = async () => {
    try {
      setLoading(true);
      const data = await getPokemons(27, 27 * page);
      const promises = data.results.map(async(pokemon) => {
        return await getPokemonData(pokemon.url);
      }) //array de promesas
      const results = await Promise.all(promises);
      setPokemons(results);
      setLoading(false);
      setTotal(Math.ceil(data.count / 27))
      setNotFound(false);
    } catch (error) {
      console.log("error");
    }
  };

  //Guarda los pokemones favotitos en el localstorage, no se borran al recargar la pagina
  const loadFavoritePokemons = () => {
    const pokemons = JSON.parse(window.localStorage.getItem(localStorageKey)) || [];
    setFavorites(pokemons); 
  };

  //Funcion lambda
  useEffect(() => {
    loadFavoritePokemons();
  }, []);

  useEffect(() => {
    if(!searching) {
    fetchPokemons();
    }
  }, [page]);

  //Cambiar titulo de pagina
  useEffect(() => {
    document.title = 'Pokedex';
  });

  const updateFavoritePokemons = (name) => {
    const updated = [...favorites];
    const isFavorite = updated.indexOf(name);
    if(isFavorite >= 0) {
      updated.splice(isFavorite, 1);
    }
    else{
      updated.push(name);
    } 
    setFavorites(updated);
    window.localStorage.setItem(localStorageKey, JSON.stringify(updated));
  };

  const onSearch = async (pokemon) => {
    if(!pokemon) {
      return fetchPokemons();
    }
    setLoading(true);
    setNotFound(false);
    setSearching(true);
    const result = await searchPokemon(pokemon);
    if(!result) {
      setNotFound(true);
      setLoading(false);
      return;

    } else {
      setPokemons([result]);
      setPage(0);
      setTotal(1);
    }
    
    setLoading(false);
    setSearching(false);
  };

  return (
    <FavoriteProvider value={{favoritePokemons: favorites, updateFavoritePokemons: updateFavoritePokemons}}>
      <div>
        <Navbar />
        <div className="APP">
          <Searchbar onSearch={onSearch} />
            {notFound ?
              <div className="not-found-text">No se encontro el Pokemon</div>
              : 
              <Pokedex 
                loading={loading}
                pokemons={pokemons}
                page={page}
                setPage={setPage}
                total={total}
              />
            } 
        </div>
      </div>
    </FavoriteProvider>
  );
}

export default App;
