import React, {useState, useEffect} from 'react';
import "./recipes.css";
import { searchRecipes, getRecipes, getDiets } from '../../redux/Actions';
import { connect } from 'react-redux';
import Recipe from '../recipe/Recipe'
import Filter from '../filter/Filter'
import Pages from '../pages/Pages'
import Coding from '../../img/about.gif'


const Recipes = ({ location, allrecipes, searchedRecipes, searchRecipes, getRecipes, getDiets }) => {
  useEffect(() => {
    getRecipes()
    getDiets();
  }, [getDiets, getRecipes])

  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = useState(1);
   

  useEffect(() => {
    if (location.search !== '') {
      setPage(parseInt(location.search.slice(location.search.indexOf('=') + 1)));
    }
  }, [location.search])

 
  useEffect(() => {
    if (searchedRecipes.length > 0 && searchedRecipes !== 'undefined' && typeof searchedRecipes !== 'string' ) {
      //aqui tengo que ponerle un if cosas que si es vacio, no le asigne
      setRecipes(searchedRecipes)
    }
    else {
      setRecipes(allrecipes)
    }
  }, [allrecipes, searchedRecipes, recipes])

  useEffect(() => {
    return searchRecipes('')
  }, [searchRecipes])


  function handleOrder(param) {
    switch (param) {
      case 'A-Z':
        return setRecipes([...recipes].sort((a, b) => {
          if (a.title > b.title) {
            return 1;
          }
          if (a.title < b.title) {
            return -1;
          }
          return 0;
        }))
      case 'Z-A':
        return setRecipes([...recipes].sort((a, b) => {
          if (b.title > a.title) {
            return 1;
          }
          if (b.title < a.title) {
            return -1;
          }
          return 0;
        }))
      case 'BestScore':
        return setRecipes([...recipes].sort((a, b) => { return b.spoonacularScore - a.spoonacularScore }))
      case 'WorstScore':
        return setRecipes([...recipes].sort((a, b) => { return a.spoonacularScore - b.spoonacularScore }))
      default:
        return setRecipes([...allrecipes])
    }
  }

     function handleFilter(param) {
      if (param !== undefined && param.length){return setRecipes(recipes.filter(r =>r.diets!==undefined? r.diets.map(e=> e=e.toLowerCase()).includes(param.toLowerCase()): null))
     } else {return setRecipes([...allrecipes])};
    }

    return(
      <div>
        <Filter filter={handleFilter} order={handleOrder} />
        <div className="containerRecipes">
         {recipes?.length > 0 ? recipes.slice((page - 1) * 9, page * 9).map(r => 
         <div key={r.id}>
           <Recipe
               id={r.id}
               title={r.title}
               img={r.image}
               diet={r.diet?r.diet:r.diets}
               score={r.spoonacularScore}
             />
          </div>
          ) :
          <div>
            <h2>No se encontraron recetas que coincidan con la busqueda</h2>
            <img src={Coding} alt='Coding gif' />
          </div>}    
            <Pages allRecipes={recipes} page={page} />   
       </div>
      </div>
    )
}

function mapStateToProps(state) {
  return {
    searchedRecipes: state.searchedRecipes,
    allrecipes: state.allRecipes,
    alldiets: state.allDiets
  }
}

function mapDispatchToProps(dispatch) {
  return {
    searchRecipes: (data) => dispatch(searchRecipes(data)),
    getDiets: () => dispatch(getDiets()),
    getRecipes: () => dispatch(getRecipes())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);
