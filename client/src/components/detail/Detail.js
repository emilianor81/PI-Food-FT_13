import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './detail.css';
import dog from '../../img/about.gif'
import image from '../../img/default.jpg'

function Detail({ recipe, diets }) {
  const renderHTML = (rawHTML) =>
    React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });

  const [r, setRecipe] = useState({})

  useEffect(() => {
    setRecipe(recipe)
  }, [recipe])

  useEffect(() => {
    return setRecipe({})
  }, [])

  if (r.title !== undefined) {
    return (
      <div id='Details'>
        <div id='Detail'>
          <h2>{r.title}</h2>
          <h3>Health Score: {r.healthScore}</h3>
          <h3>SpoonacularScore: {r.spoonacularScore}</h3>
          <div className='Diets'>
            {diets.filter(d => {return r.diets? r.diets.map(e=> e=e.toLowerCase()).includes(d.name.toLowerCase()):null || r.diets?r.diets.find(diet => d.name === diet.name):null})
            .map(d => <h3 className='diets' key={d.name}>{d.name}</h3>)}
         </div>     
          <img id='RecipeImage' src={r.image ? r.image : image} alt='recipe' />
          <div id='sumary'>
            {renderHTML(r.summary)}
            <p id='instruc'> Instructions:</p>
            <ul>
            {(r.analyzedInstructions? r.analyzedInstructions.map(d => <li key={d.id} >{d.step}</li>): <li> {r.instructions}</li>)}
            </ul>
         </div>
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <img src={dog} alt='dog gif'/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    recipe: state.recipeDetail,
    diets: state.allDiets
  }
}

export default connect(mapStateToProps)(Detail)