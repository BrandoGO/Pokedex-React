import React from "react";
import Paginacion from "./Pagincacion";
import Pokemon from "./Pokemon";

//props = objeto
const Pokedex = (props) => {
  const { pokemons, page, setPage, total, loading } = props;

  //Pagina anterior
  const lastPage = () => {
    const nextPage = Math.max(page - 1, 0);
    setPage(nextPage);
  }

  //Siguiente pagina
  const nextPage = () => {
    const nextPage = Math.min(page + 1, total - 1);
    setPage(nextPage);
  }


  //.map = es una funcion que pasa por todos los elementos de un array y regresa algo nuevo
  //React utiliza los identificadores unicos de los arrays, una vez listo el array, react puede optimizar su renderizacion basado en las keys

  return (
    <div>
        <div className="header">
            <h1>Pokedex</h1>
            <Paginacion 
                page={page + 1} 
                totalPages={total}
                onLeftClick={lastPage}
                onRightClick={nextPage}
            />
        </div>

          {loading ? 
            <div>Cargando pokemones...</div> : 
            <div className="pokedex-grid">
              {pokemons.map((pokemon, idx) => {
              return (
              <Pokemon pokemon={pokemon} key={pokemon.name}/>
              )
              })}
            </div>
          }
    </div>
  );
};

export default Pokedex;