const express = require('express');
const axios = require('axios');
const router = express.Router();
const { Recipe, Diet} = require('../db')
const {BASE_URL, URL_COMPLEX, URL_DETAIL } = require('../../constants');
const API_KEY = process.env.API_KEY;


const Load = router.get('/', async (req, res) => {
   const {name}= req.query;
    const recipesArray = [];
       try{
         res.send('Va queriendo, y olvidate de la fuckingin appi')
            // const recipeResponses = await axios.get(`${BASE_URL}/${URL_COMPLEX}?apiKey=${API_KEY}&${URL_DETAIL}&number=5`);
            // console.log('aqui llega bien', recipeResponses.data.results)
            // recipeResponses.data.results.forEach(recipe => {
            //     let {id, title, image, spoonacularScore, summary, healthScore, instructions, diets} = recipe; 
            //     console.log('holaaaaaaaa')
            //     if (summary.length > 30){
            //         summary = summary.slice(0, 15)
            //     }
            //     console.log('llego hasta aquiiii')
            //     const sentRecipe = { title, summary, spoonacularScore,  healthScore, instructions, id };
            //     if(!sentRecipe) return res.send('Dato No Valido');
            //     let newRecipe = Recipe.create(sentRecipe)
            //       .then(() => {
            //           diets.forEach(diet => {
            //             let dietBD2 = Diet.findAll({where: {diet}})
            //             .then(() =>{
            //                 console.log('diet 22222222222222222222222222222', dietBD2)
            //                     // newRecipe.setDiets(dietBD2[0].dataValues.id)                         
            //             }).catch((err)=>{
            //                 console.error('Error on create set', err);          
            //             })
            //           })                        
            //       }).catch((err) => {
            //         console.error('Error on create Function', err);
            //       })    
            }) 
        }catch (error) {
          return res.sendStatus(500).send(error); 
        }
});  
         
        

module.exports = Load;
