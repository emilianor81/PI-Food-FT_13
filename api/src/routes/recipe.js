const express = require('express');
const router = express.Router();
const { Recipe, Diet} = require('../db')
const { v4: uuid } = require('uuid');


let ids = 10;

const addRecipe = router.post('/', async (req, res, next) => {
    const id = uuid();
    let array = [];
    const { title, summary, spoonacularScore, healthScore, instructions, diets } = req.body;
    if (Array.isArray(diets)){
        for(let i=0; i<diets.length; i++){
            let name = diets[i];
            let dietBD = await Diet.findOrCreate({
                where: {name},
                defaults: {name, id:(ids = ids+1)}
            })
            console.log(ids);
            array.push(dietBD[0].dataValues.id)
        }
    } else { 
         const dietBD2 = await Diet.findOrCreate({
            where: {diets},
            defaults: {diets, id:(ids = ids+1)}
            })
            array.push(dietBD2[0].dataValues.id)
        }
    const sentRecipe = { 
        title, 
        summary, 
        spoonacularScore, 
        healthScore, 
        instructions, 
        id 
    };
    if(!sentRecipe) return res.send('Dato No Valido');
    try{
        const newRecipe = await Recipe.create(sentRecipe);
        // si diets es un array le aplicamos for, sino, le hacemos lo mismo
        /*
        await Diet.findOrCreate({
            where: {diet[i]},
            defaults: {diet[i], id}
            })
        */
       array.forEach(e=>{
           newRecipe.setDiets(e);
       })
        arry = [];
        // console.log(newRecipe);
        return res.send(newRecipe);
    }catch (err){
        next(err);
    }
})

module.exports = addRecipe;
// let IDdiet = 10;
// const addRecipe = router.post('/', async (req, res, next) => {
//   const id = uuid();
//   const { title, summary, score, healthScore, instructions, diets} = req.body;
//   const RecipeNew = { title, summary, score, healthScore,instructions,  id  };
//   if (Array.isArray(diets)){
//     for(let i=0; i < diets.length; i++){
//         let name = diets[i];
//         let dietBD = await Diet.findOrCreate({
//             where: {name},
//             defaults: {name, id:(IDdiet = IDdiet++)}
//         })
//         console.log(ids);
//         array.push(dietBD[0].dataValues.id)
//     }
// } else { 
//      const dietBD2 = await Diet.findOrCreate({
//         where: {diets},
//         defaults: {diets, id:(ids = ids+1)}
//         })
//         array.push(dietBD2[0].dataValues.id)
//     }
//     try{
//         const newRecipe = await Recipe.create(sentRecipe);
//         array.forEach(e=>{newRecipe.setDiets(e);})
//         arry = [];
//         return res.send(newRecipe);
//     }catch (err){
//         next(err);
//     }

// })
