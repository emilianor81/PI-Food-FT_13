import React  from 'react';
import './Recipe.css';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { searchRecipeDetail } from '../../redux/Actions'


function Recipe(props) {
  return(
      <div className='Recipe' >
           <div>
             <h3>{props.title} </h3> 
             <h5>Score : {props.score}</h5>
             <div className='Diets'>
             {props.diets.filter(d => {return props.diet.includes(d.name.toLowerCase()) || props.diet.find(diet => d.name === diet.name)})
        .map(d => <span className='diets' key={d.id}>{d.name}</span>)}
      </div>
             <img src={props.img} className='RecipeImage' alt='recipe' />
                      
           </div>
      </div>
  )
}

// return (
//   <div className='Recipe' >
//     <h3 className='RecipeName'>{props.title}</h3>
//     <div className='RecipeInfo'><div className='Diets'>

//     </div>
//     )

function mapStateToProps(state) {
  return {
    diets: state.allDiets,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    searchRecipeDetail: recipe => dispatch(searchRecipeDetail(recipe)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Recipe)
