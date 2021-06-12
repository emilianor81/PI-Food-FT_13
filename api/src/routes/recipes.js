const express = require('express');
const axios = require('axios');
const router = express.Router();
const { Recipe } = require('../db')
const { v4: uuid } = require('uuid');
const {BASE_URL, URL_COMPLEX, URL_DETAIL } = require('../../constants');
const API_KEY = process.env.API_KEY;

// SI QUIERO TRAERME TODOS LOS ELEMENTOS DE MI TABLA DIET HAGO LO SIGUIENTE:
// const DietGet = router.get('/', (req, res)=>{
//   return Diet.findAll()
//     .then((diets)=>res.send(diets))
//     .catch((err)=> console.log('Hay un error en la dieta ingresada'))
// })


const RecipeDetail = router.get('/:id', async (req, res) => {
 const { id } = req.params;
 if (!id)
   return res.status(404).send("Sorry, id not found soy emi");
  try {
      const recipeDetailResponse = await axios.get(`${BASE_URL}/${id}/information?apiKey=${API_KEY}`);
      if(recipeDetailResponse){
        let { title,  image,summary, spoonacularScore, healthScore, diets, analyzedInstructions } = recipeDetailResponse.data;
        return res.send({title, image,summary, spoonacularScore, healthScore, diets, analyzedInstructions });    
      }
    } catch (error) {
        console.log('No se encontro el ID ingresado!',error);
        res.sendStatus(500); 
    }     
  
})
    


const Recipes = router.get('/', async (req, res) => {
  console.log(API_KEY)
  const {name}= req.query;
    if (!name) {
        return res.status(404).send("Error, Name not found");
    }
    const recipesArray = [];
    const filtrados= [];
        try {
            const recipeResponses = await axios.get(`${BASE_URL}/${URL_COMPLEX}?apiKey=${API_KEY}&${URL_DETAIL}&query=${name}&number=20`);
            
            recipeResponses.data.results.forEach(recipe => {
               let {id, title, spoonacularScore, summary, healthScore, instructions} = recipe;
              if (recipe.title.toLowerCase().includes(name)){ 
                    recipesArray.push({id, title, spoonacularScore, summary, healthScore, instructions})
               }
            });
            const recipePropias = await Recipe.findAll();
            recipePropias.forEach(recipe => {
                 let {id, title, spoonacularScore, summary, healthScore, instructions} = recipe;
                 if (recipe.title.toLowerCase().includes(name)){ 
                   recipesArray.push({id, title, spoonacularScore, summary, healthScore, instructions})
                 }
            });              
            if(recipesArray.length > 0) {
              let arraySent = recipesArray.slice(0,9);
              return res.send(arraySent)
            };
            res.status(404).send('the recepe you search does not exist')
            
          } catch (error) {
            return res.sendStatus(500).send(error); 
            }
        });
            
        

module.exports = Recipes;




