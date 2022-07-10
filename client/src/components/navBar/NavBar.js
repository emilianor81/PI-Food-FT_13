import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import style from "./NavBar.module.css";
import { searchRecipes, getRecipes  } from '../../redux/Actions';
import { connect } from 'react-redux';


const NavBar = (props) => {
  const [recipe, setRecipes] = useState('');
  // useEffect(() => {
  //   getRecipes()
  //   getDiets();
  // }, [getRecipes, getDiets])

  function handleChange(event) {
    props.searchRecipes(event.target.value)
    setRecipes(event.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    props.searchRecipes(recipe)
    setRecipes('')
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
          <input className={style.input} id='SearchInput' type='text' placeholder='Ingrese su busqueda' value={recipe}
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
    getRecipes: () => dispatch(getRecipes()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);