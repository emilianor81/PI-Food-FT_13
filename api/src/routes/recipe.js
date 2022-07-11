const express = require('express');
const router = express.Router();
const { Recipe, Diet} = require('../db')
const { v4: uuid } = require('uuid');


const addRecipe = router.post('/', async (req, res, next) => {
    let arrayDiets = [];
    const { title, summary, spoonacularScore, healthScore, instructions, diets } = req.body;
    if (Array.isArray(diets)){
        for(let i=0; i < diets.length; i++){
            let name = diets[i];
            let dietBD = await Diet.findAll({where: {name}})
            arrayDiets.push(dietBD[0].dataValues.id)
        }
    } else { 
         const dietBD2 = await Diet.findAll({where: {diets}})
         arrayDiets.push(dietBD2[0].dataValues.id)
        }
        
    const sentRecipe = { 
        title, 
        summary, 
        spoonacularScore, 
        healthScore, 
        instructions, 
    };

    if(!sentRecipe) return res.send('Dato No Valido');
    try{
        const newRecipe = await Recipe.create(sentRecipe);
        arrayDiets.forEach(e => {newRecipe.setDiets(e)})
        return res.send(newRecipe);
    }catch (err){
        next(err);
    }
})

module.exports = addRecipe;

