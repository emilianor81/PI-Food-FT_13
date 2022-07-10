import axios from 'axios';

export function getRecipes() {
  return function (dispatch) {
    axios.get('http://localhost:3001/recipes')
      .then(res => dispatch({
        type: 'ALL_RECIPES',
        payload: res.data
      })
      ).catch(err => {
        console.error(err)
      });
  };
};


export function searchRecipes(recipe) {
  if (recipe !== '') {
    return function (dispatch) {
      axios.get(`http://localhost:3001/recipes?name=${recipe}`)
       .then(res => dispatch({
          type: 'SEARCH_RECIPES',
          payload: res.data
        })
        ).catch(err => {
          console.error(err)
        });
    };
  } else {
    return {
      type: 'SEARCH_RECIPES',
      payload: []
    }
  };
};

export function searchRecipeDetail(recipeId) {
  return function (dispatch) {
    axios.get(`http://localhost:3001/recipes/${recipeId}`)
     .then(res => dispatch({
        type: 'SEARCH_RECIPE_DETAIL',
        payload: res.data
      })
      ).catch(err => {
        console.error(err)
      });
  };
};

export function addRecipe( Recipe ) {
  return function (dispatch) {
    axios.post(`http://localhost:3001/recipe`, Recipe)
      .then(res => dispatch({
        type: 'ADD_RECIPE',
        payload: res.data
      })
      ).catch(err => {
        console.error(err)
      });
  }
}

export function getDiets() {
  return function (dispatch) {
    axios.get(`http://localhost:3001/types`)
     .then(res => dispatch({
        type: 'ALL_DIETS',
        payload: res.data
      })
      ).catch(err => {
        console.error(err)
      });
  };
};

