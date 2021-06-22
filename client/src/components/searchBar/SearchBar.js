import React from 'react';
// import { Link } from 'react-router-dom';
// import style from './Search.module.css';


// TIENE QUE HACER SIMILAR A LO QUE HACE EL FILTER CON EL INCLUDE PERO PARA TITLE, ANALIZAR!!!!


const SearchBar = ({ input, setInput }) => {
  return (
      <form>
        <input type="text" placeholder="Ingrese la receta a buscar..."></input>
        <input type="submit">Buscar</input>
      </form>
  )
}
export default SearchBar;