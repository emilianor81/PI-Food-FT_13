import React from 'react';
// import { Link } from 'react-router-dom';
// import style from './Search.module.css';

const SearchBar = ({ input, setInput }) => {
  return (
      <form>
        <input type="text" placeholder="Ingrese la receta a buscar..."></input>
        <input type="submit">Buscar</input>
      </form>
  )
}
export default SearchBar;