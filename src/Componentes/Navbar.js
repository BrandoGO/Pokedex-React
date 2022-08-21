import React from "react";
import FavoriteContext from "../Context/favoriteContext";

const {useContext} = React;

const Navbar = () => {
  const {favoritePokemons} = useContext(FavoriteContext);
  
  //Creacion de variable de JavaScript
  let imgURL ="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png";

  //class es un keyword de JavaScript. Usar className para css

  return (
    <nav>
      <div />
      <div>
        <img src={imgURL} alt="pokeapi-logo" className="navbar-image"></img>
      </div>
      <div>&#10084;&#65039; {favoritePokemons.length}</div>
    </nav>
  );
};

export default Navbar;