import React, { useState } from 'react';
import './create.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addRecipe, getRecipes } from '../../redux/Actions';
import Swal from 'sweetalert2';

function Create(props) {
  // const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    title: '',
    summary: '',
    spoonacularScore: 0,
    healthScore: 0,
    instructions: '',
    diets: []
  })

  function handleSubmit(e) {
    e.preventDefault();
    props.addRecipe(form);
    props.getRecipes();
    Swal.fire({
      icon: 'success',
      title: 'Recipe Created Successfully',
      showConfirmButton: false,
      timer: 1500
    })
  }


  const handleInputChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

   return (
    <div className='NewR'>
      
      <form className='RecipeForm' onSubmit={(e) => handleSubmit(e)}>
        <div className='CreateForm'>
          <label className='LabelTitle'>Title:</label>
          <input type='text' name='title' onChange={handleInputChange} />
          <label className='LabelTitle'>spoonacularScore:</label>
          <input type='number' min='0' max='100' name='spoonacularScore' onChange={(e) => setForm({ ...form, spoonacularScore: e.target.value })} />
          <label className='LabelTitle'>health Score:</label>
          <input type='number' min='0' max='100' name='healthScore'
            onChange={(e) => setForm({ ...form, healthScore: e.target.value })} />
            <div className='textareas'>
               <label className='LabelTitle'>Summary:</label>
               <textarea name='summary' onChange={handleInputChange} />
            </div>     
            <div className='textareas'>
                <label className='LabelTitle'>Instructions:</label>
                <textarea name='instructions' onChange={(e) => setForm({ ...form, instructions: e.target.value })} />
            </div>          


        </div>
        <div className='DietsAndSubmitButton'>
          <label className='LabelTitle'> Diets: </label>
          {props.diets.map(d => <label className='DietsLabel' key={d.id}><input type='checkbox' name={d.name} value={d.name}
            onChange={(e) => setForm({ ...form, diets: [...form.diets, e.target.value] })}
          />{d.name}</label>)}
          
        </div>
      </form> 
      <div className='buttons'>
          <button className='CreateSubmitButton' onClick={(e) => handleSubmit(e)} type='submit'>Submit</button>
          <button className='CreateSubmitButton' ><Link to='/home'>Back to Home</Link></button>
      </div>

    </div>
  )
}

function mapStateToProps(state) {
  return {
    diets: state.allDiets,
    // user: state.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addRecipe: info => dispatch(addRecipe(info)),
    getRecipes: () => dispatch(getRecipes())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Create)