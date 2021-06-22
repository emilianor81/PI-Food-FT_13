const express = require('express');
const axios = require('axios');
const router = express.Router();
const { Recipe, Diet} = require('../db')
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
    if (!id) return res.status(404).send("Please type a right ID");
    try {
        if (id.length > 10){
        console.log('entro a buscar recipe de la db')
        const dbRecipe= await Recipe.findByPk(id);
        console.log(dbRecipe)
        let {title, summary, spoonacularScore, healthScore, instructions} = dbRecipe.dataValues;
         if(dbRecipe.dataValues)
          console.log('encontro el id en la db')
           return  res.send({title, summary, spoonacularScore, healthScore, instructions})
        } else {
          console.log('entro a buscar recipe de la api')
          const apiRecipe = await axios.get(`${BASE_URL}/${id}/information?apiKey=${API_KEY}`);
        if(apiRecipe){
          console.log('encontro el id en la api')
          let { title,  image, spoonacularScore, healthScore, diets, summary, analyzedInstructions } = apiRecipe.data;
         return res.send({title, image, summary, analyzedInstructions, spoonacularScore, healthScore, diets }); 
        }   
       }
    }
    catch (error) {  
        res.status(404).send("Input Id doesn't exist");
    }  
})
    

const Recipes = router.get('/', async (req, res) => {
   const {name}= req.query;
    const recipesArray = [];
       try{
      if (!name) {
            const recipeResponses = await axios.get(`${BASE_URL}/${URL_COMPLEX}?apiKey=${API_KEY}&${URL_DETAIL}&number=50`);
            recipeResponses.data.results.forEach(recipe => {
               let {id, title, image, spoonacularScore, summary, healthScore, instructions, diets} = recipe;
                recipesArray.push({id, title, image, spoonacularScore, summary, healthScore, instructions, diets})
            });
            const recipePropias = await Recipe.findAll({
              include: [Diet]
          });
            recipePropias.forEach(recipe => {
                 let {id, title, spoonacularScore, summary, healthScore, instructions} = recipe;
                 recipesArray.push({id, title, spoonacularScore, summary, healthScore, instructions})
            });
            if(recipesArray.length > 0){
              return res.send(recipesArray)
            }else{
              return res.send('No existen registros que coincidan con la busqueda')
            }           
      }else{
        const recipeResponses = await axios.get(`${BASE_URL}/${URL_COMPLEX}?apiKey=${API_KEY}&${URL_DETAIL}&number=50`);
        recipeResponses.data.results.forEach(recipe => {
           let {id, title, image, spoonacularScore, summary, healthScore, instructions, diets} = recipe;
          if (recipe.title.toLowerCase().includes(name)){ 
                recipesArray.push({id, title, image,spoonacularScore, summary, healthScore, instructions, diets})
           }
        });
        const recipePropias = await Recipe.findAll({include: Diet});
      // const dbRecipes = Recipe.findAll({where: {name: {[Op.like]: `%${name}%`}}, include: Diet})
        console.log(recipePropias[0].dataValues.diets[0].dataValues.name)
        //este es el array que tengo que enviar: recipePropias[0].dataValues.diets[0]
        recipePropias.forEach(recipe => {
             let {id, title, spoonacularScore, summary, healthScore, instructions} = recipe;
             if (recipe.title.toLowerCase().includes(name)){ 
                    //  console.log("RECIPE CON NAME: ", recipe);
                     const {diets} = recipe.dataValues
                     const diet = [];
                     for (let i = 0; i < diets.length; i++) {
                       console.log("DIETS: ", diets[i].dataValues.name);
                       diet.push(diets[i].dataValues.name)
                      // diet.concat(diets[i].dataValues.name);
                     }
                    //  recipesArray.push({...recipe, diets: diet});
                    //  console.log("RECIPES: ", recipesArray);
               recipesArray.push({id, title, spoonacularScore, summary, healthScore, instructions, diets: diet})
               console.log("RecipesArray por enviar",recipesArray)
             }
        });       
        if(recipesArray.length > 0){
          return res.send(recipesArray)
        }else{
          return res.send('No existen registros que coincidan con la busqueda')
        }     
      }
    }catch (error) {
                  return res.sendStatus(500).send(error); 
                  }
                });  
         
        

module.exports = Recipes;


 // if (recipe.title.toLowerCase().includes(name)){
        //   //  console.log("RECIPE CON NAME: ", recipe);
        //    const {diets} = recipe.dataValues
        //    const diet = [];
        //    for (let i = 0; i < diets.length; i++) {
        //      console.log("DIETS: ", diets[i].dataValues.name);
        //     diet.concat(diets[i].dataValues.name);
        //    }
        //    recipesArray.push({...recipe, diets: diet});
        //    console.log("RECIPES: ", recipesArray);
        //   }





 // const apiRecipes = axios.get(`https://api.spoonacular.com/recipes/complexSearch?&addRecipeInformation=true&${API_KEY}&number=20`)
        //   const dbRecipes = Recipe.findAll( { include: Diet })
        //   Promise.all([apiRecipes, dbRecipes])
        //   .then(r => {
        //       let [apiResponse, dbResponse] = r;
        //       const response = dbResponse.concat(apiResponse.data.results)
        //       const ultimateRecipes = response.map(r =>({
        //           id: r.id,
        //           img: r.image,
        //           title: (r.title ? r.title : r.name),
        //           diet: (r.diet ? r.diet : r.diets),
        //           spoonacularScore: (r.score ? r.score : r.spoonacularScore) 
        //       }))
        //       console.log(ultimateRecipes)
        //   res.send(ultimateRecipes)
        //   })





        //ANTES DE LOS CAMBIOS

        // const Recipes = router.get('/', async (req, res) => {
        //   const {name}= req.query;
        //     const recipesArray = [];
        //        try{
        //       if (!name) {
        //             const recipeResponses = await axios.get(`${BASE_URL}/${URL_COMPLEX}?apiKey=${API_KEY}&${URL_DETAIL}&number=50`);
        //             recipeResponses.data.results.forEach(recipe => {
        //                let {id, title, image, spoonacularScore, summary, healthScore, instructions, diets} = recipe;
        //                 recipesArray.push({id, title, image, spoonacularScore, summary, healthScore, instructions, diets})
        //             });
        //             const recipePropias = await Recipe.findAll({
        //               include: [Diet]
        //           });
        //             recipePropias.forEach(recipe => {
        //                  let {id, title, spoonacularScore, summary, healthScore, instructions} = recipe;
        //                  recipesArray.push({id, title, spoonacularScore, summary, healthScore, instructions})
        //             });
        //             if(recipesArray.length > 0){
        //               // res.status(200)
        //               res.status(200);
        //               return res.send(recipesArray)
        //             }else{
        //               return res.send('No existen registros que coincidan con la busqueda')
        //             }           
        //       }else{
        //         const recipeResponses = await axios.get(`${BASE_URL}/${URL_COMPLEX}?apiKey=${API_KEY}&${URL_DETAIL}&number=50`);
        //         recipeResponses.data.results.forEach(recipe => {
        //            let {id, title, image, spoonacularScore, summary, healthScore, instructions, diets} = recipe;
        //           if (recipe.title.toLowerCase().includes(name)){ 
        //                 recipesArray.push({id, title, image,spoonacularScore, summary, healthScore, instructions, diets})
        //            }
        //         });
        //         const recipePropias = await Recipe.findAll({include: Diet});
        //       // const dbRecipes = Recipe.findAll({where: {name: {[Op.like]: `%${name}%`}}, include: Diet})
        //         console.log(recipePropias[0].dataValues.diets[0].dataValues.name)
        //         //este es el array que tengo que enviar: recipePropias[0].dataValues.diets[0]
        //         recipePropias.forEach(recipe => {
        //              let {id, title, spoonacularScore, summary, healthScore, instructions} = recipe;
        //              if (recipe.title.toLowerCase().includes(name)){ 
        //                recipesArray.push({id, title, spoonacularScore, summary, healthScore, instructions})
        //              }
        //         });       
        //         if(recipesArray.length > 0){
        //           res.status(200);
        //           return res.send(recipesArray)
        //         }else{
        //           res.status(200);
        //           return res.send('No existen registros que coincidan con la busqueda')
        //         }     
        //       }
        //     }catch (error) {
        //                   return res.sendStatus(500).send(error); 
        //                   }
        //                 });  
                 
                
        
     