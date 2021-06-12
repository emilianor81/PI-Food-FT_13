const express = require('express');
const axios = require('axios');
const router = express.Router();
const { Recipe } = require('../db');

const {BASE_URL, URL_COMPLEX, URL_DETAIL } = require('../../constants')
const API_KEY = process.env.API_KEY;

const RecipeDetail = router.get('/', async (req, res) => {
    const { id } = req.params;
    console.log(req.body)
    console.log(req.params)
    console.log(req.query);
    if (!id)
     return res.status(404).send("Sorry, id not found soy emi");
    try {
      console.log('entro al try')
        const recipeDetailResponse = await axios.get(`${BASE_URL}/${id}/information?apiKey=${API_KEY}`);
        const idInteger = parseInt(id)
        if (idInteger !== recipeDetailResponse.data.id) { 
            return res.status(404).send("The id doesn't exist");
    }
        let { title,  image, spoonacularScore, healthScore, diets, summary, analyzedInstructions } = recipeDetailResponse.data;
        //recipeArr.push();
        // dishTypes = dishTypes.join(' ')
        // diishTypes = dishTypes.split(', ')
        res.send({
            title,
            image,
            summary,
            analyzedInstructions,
            spoonacularScore,
            healthScore,
            diets
        });
    }
    catch (error) {
        const dbQuery = await Recipe.findOne({where:{id}})
            if(dbQuery !== null) return res.json(dbQuery)
        console.log('The Id doesn"t exist', error);
        res.sendStatus(500);
    }
})

module.exports = RecipeDetail;