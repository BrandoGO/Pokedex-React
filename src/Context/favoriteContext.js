import React from "react";

//Context es una forma de pasar informacion a diferentes lugares de la aplicacion utilizando react
const FavoriteContext = React.createContext({
    favoritePokemons: [],
    updateFavoritePokemons: (id) => null
});

export const FavoriteProvider = FavoriteContext.Provider;

export default FavoriteContext;