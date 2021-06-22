import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './detail.css';
import dog from '../../img/about.gif'
import { Link } from 'react-router-dom';

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
       <button className='BackButton' onClick={() => setRecipe({})}><Link className='Link' to='/home'>Back to Home</Link></button>
        <div id='Info'>
          <h2>{r.title}</h2>
          <h3>Health Score: {r.healthScore}</h3>
          <h3>SpoonacularScore: {r.spoonacularScore}</h3>
          <div className='Diets'>
          {diets.filter(d => {return r.diets.includes(d.name.toLowerCase()) || r.diets.find(diet => d.name === diet.name)})
          .map(d => <h3 className='diets' key={d.name}>{d.name}</h3>)}
          </div>
          <img id='RecipeImage' src={r.image ? r.image : dog} alt='recipe' />
          <div id='SummaryAndSBS'>
            {renderHTML(r.summary)}
            <p id='SBS'> Instructions:</p>
            <ul>
            {(r.analyzedInstructions[0].steps.map(d => <li key={d.number} >{d.step}</li>))}

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