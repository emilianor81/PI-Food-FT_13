const {Router} = require('express');
const {BASE_URL, URL_COMPLEX, URL_DETAIL } = require('../../constants');
const API_KEY = process.env.API_KEY;
const router = Router();
const axios = require('axios');
const { v4: uuid } = require('uuid');
const express = require('express');
// const Diet = require('../models/Diet');
const { Diet } = require('../db')

const dietTypes = router.get('/',async (req, res) =>{
  // HACER UN GET DE TODAS LAS RECETAS Y SACARLE A CADA UNA LAS DIETAS Y ESTAS DIETAS PONERLAS EN UN ARREGLO
  // Y METERLA EN MI TABLA DIETA SI NO EXISTEN
  const recipesArray = [];
  const DietsArray = [];
      try {
        const dietsBD = await Diet.findAll()
        return res.json(dietsBD)

              //if(Diet.length>8) {return 'hola';};// hay que hacer esto!!!!!!!!!!!!!!!!!!!!!!!! que no se boorre la base de datos!
                 // if(dbQuery.length > 9) {

          //tengo que comprobar si mi tabla tiene 10 elementos q es el total de tipos de dietas,
          // const DietReg = await Diet.findAll() //me traigo todos los reg de la tabla Diet
          // if(DietReg.length >= 10) {
          //   return res.json(DietReg)
          // }
          // // si no tiene tengo mas de 9 tengo que hacer todo este procedimiento
          // // que hacer un get de las recetas y recorrer las dietas para agregarle todas las posibles
          //      const recipeResponses = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=f173adfaa457492e9f4da2d871ec969c&addRecipeInformation=true&number=100`);
          //     recipeResponses.data.results.forEach(recipe => recipesArray.push(recipe));
          //       recipesArray.forEach(r =>{
          //       if(r.diets.length > 0){
          //         for (let i = 0 ; i < r.diets.length; i++ ){
          //           let DietNew = r.diets[i];
          //           if (!DietsArray.includes(DietNew)){
          //             DietsArray.push(DietNew) 
          //           }
          //         }
          //       }
          //     });
          //       for (let i = 0; i < DietsArray.length; i++) {
          //       console.log('entro al for')
          //       const id = uuid();
          //       console.log('este es el id creado '+ id);
          //       const dietName = DietsArray[i];
          //       console.log('este es el dietname q voy a agregar creado '+ dietName)
          //       await Diet.findOrCreate({where: {dietName}, defaults: {dietName, id}})               
          //     }         
          // //ahora de DietsArray tengo que dejar los que no estan repetidos y meterlos en mi tabla Diet 
          // const DietReg2 = await Diet.findAll() 
          // console.log('Hola Soy una Dieta! Estoy avanzando con el PI en la parte de dietas!!!')   
          // return res.json(DietReg2);
      }catch{
        console.log('hay un error en los types')
      }
});


module.exports =  dietTypes;