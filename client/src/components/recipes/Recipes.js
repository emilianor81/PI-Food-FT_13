import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import style from "./recipes.css";
import { searchRecipes, getRecipes, getDiets } from '../../redux/Actions';
import { connect } from 'react-redux';
import Recipe from '../recipe/Recipe'
import Filter from '../filter/Filter'


const Recipes = ({ location, allrecipes, searchedRecipes, searchRecipes, getRecipes, getDiets }) => {
  
  useEffect(() => {
    getRecipes()
    getDiets();
  }, [getRecipes, getDiets])


  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = useState(1);
   

  useEffect(() => {
    if (location.search !== '') {
      setPage(parseInt(location.search.slice(location.search.indexOf('=') + 1)));
    }
  }, [location.search])

  // useEffect(() => {
  //   if (searchedRecipes) {
  //     setRecipes(searchedRecipes)
  //   }
  //   else {
  //     setRecipes(allrecipes)
  //   }
  // }, [allrecipes, searchedRecipes])

  useEffect(() => {
    if (searchedRecipes && searchedRecipes!== 'undefined') {
      setRecipes(searchedRecipes)
    }
    else {
      setRecipes(allrecipes)
    }
  }, [allrecipes, searchedRecipes])

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

  // function handleFilter(param) {
  //   if (recipes.filter(r => r.diets.includes(param.toLowerCase())).length>0){
  //     return setRecipes(recipes.filter(r => r.diets.includes(param.toLowerCase())))
  //  } else {
  //    return setRecipes([...allrecipes])};
  // }

  function handleFilter(param) {
    return setRecipes(recipes.filter(r => r.title.includes('and')))
  //   if (param !== undefined && param.length)
  //     {return setRecipes(recipes.filter(r => r.diets.includes(param.toLowerCase())))
  //  } else {return setRecipes([...allrecipes])};
  }
  
 
    return(
      <div>
        <Filter filter={handleFilter} order={handleOrder} />
        <div className="recipes">
        {allrecipes.map(r =>(<div>           
              <Recipe
                id={r.id}
                title={r.title}
                img={r.image}
                diet={r.diets}
                score={r.spoonacularScore}
              />
            </div>))}      
      </div>
      </div>
           
    )
}

function mapStateToProps(state) {
  return {
    recipes: state.searchedRecipes,
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
