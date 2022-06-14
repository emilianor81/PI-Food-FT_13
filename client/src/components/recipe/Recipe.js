import React  from 'react';
import './Recipe.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { searchRecipeDetail } from '../../redux/Actions'
import image from '../../img/default.jpg'

function Recipe(props) {
  return(
        <div className='Recipe'>
             <h3>{props.title} </h3> 
             <h5>Score : {props.score}</h5>
             <div className='Diets'>
                    {props.diets.filter(d => {if (props.diet !== undefined){return props.diet.includes(d.name.toLowerCase()) || props.diet.find(diet => d.name === diet)}
              else{return props.diets}})
                .map(d => <span className='diets' key={d.id}>{d.name?d.name:props.diet}</span>)}          
             </div>
              <Link to="/detail"><button className='buton' onClick={() => props.searchRecipeDetail(props.id)}>Detail</button></Link> 
             <img src={props.img?props.img: image} className='RecipeImage' alt='recipe' />         
        </div> 
  )
}

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