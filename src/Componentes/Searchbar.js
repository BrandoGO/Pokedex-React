import React from "react";

const { useState } = React; //Cada que cambie una variable hace un cambio en el estado, por cada cambio en el estado vuelve a renderizar la pantalla

const Searchbar = (props) => {
  const {onSearch} = props;
  const [search, setSearch] = useState("");
  
  //Creacion de una funcion de evento
  const onChange = (evt) => {
    setSearch(evt.target.value);
    if(evt.target.value.length === 0) {
      onSearch(null);
    }
  };

  const onClick = async (evt) => {
    onSearch(search);
  };

  return (
    <div className="searchbar-container">
      <div className="searchbar">
        <input placeholder="Buscar Pokemon..." onChange={onChange}></input>
      </div>

      <div className="searchbar-btn">
        <button onClick={onClick}>Buscar</button>
      </div>
    </div>
  );
};

export default Searchbar;