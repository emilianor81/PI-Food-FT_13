import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import style from "./NavBar.module.css";
import { searchRecipes, getRecipes } from '../../redux/Actions';
import { connect } from 'react-redux';
// import Recipe from '../../components/recipe/Recipe'


const NavBar = (props) => {
  const [recipe, setRecipes] = useState('');
  // useEffect(() => {
  //   getRecipes()
  //   getDiets();
  // }, [getRecipes, getDiets])


  function handleChange(event) {
    setRecipes(event.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    props.searchRecipes(recipe)
    // console.log(recipes)
    // props.searchRecipes(recipe)
  }

  return (
     <nav className={style.NavBar}>
        <div className={style.Links}>
            <Link to="/home" className={style.link}>Home</Link>
            <Link to="/about" className={style.link}>About</Link>            
            <Link to="/create" className={style.link}>Create Recipe</Link>         
        </div>
      <div  className={style.form}> 
      <form onSubmit={(e) => { handleSubmit(e) }}>
          <input className={style.input} id='SearchInput' type='text' placeholder='Recipes' value={recipe}
            onChange={(e) => { handleChange(e) }}/>
          <input className={style.boton} id='SearchSubmitButton' type='submit' value='Search' />
        </form>
      </div> 
       
      </nav> 
  
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
    searchRecipes: (recipe) => dispatch(searchRecipes(recipe)),
    getRecipes: (recipe) => dispatch(getRecipes(recipe)),

  }
}


export default connect(mapStateToProps, mapDispatchToProps)(NavBar);

  