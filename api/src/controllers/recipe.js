const {Recipe} = require('../db')
const axios = require('axios')
require('dotenv').config();
const {YOUR_API_KEY} = process.env;
const {BASE_URL, URL_RECIPE, URL_DETAIL } = require('../../constants')
const API_KEY = process.env.API_KEY;

// const  BASE_URL = 'https://api.spoonacular.com/recipes/'
// const  URL_RECIPE = 'complexSearch'
// const  URL_DETAIL = 'addRecipeInformation=true'
// // https://api.spoonacular.com/recipes/complexSearch?apiKey=f173adfaa457492e9f4da2d871ec969c&addRecipeInformation=true&diet=ketogenic

// ?apiKey=${YOUR_API_KEY}
// function getAllRecipes(req, res){
//   console.log(YOUR_API_KEY);
//   const recipeApi = axios.get(`${BASE_URL}${URL_RECIPE}?apiKey${API_KEY}`);
//   // const recipeMine = Recipe.findAll();, recipeMine
//   Promise.all([recipeApi] )
//     .then((response)=> {
//       let [recipeApiResponse , recipeMineResponse] = response
//       return res.send(recipeMineResponse.concat(recipeApiResponse.data.results))
//     })
//     .catch((err)=> console.log('algo salio mal'));
// }


// async function addRecipe(req , res){
//   const newRecipe = req.body;
//   if(!newRecipe) return res.send({error: 500 , message: 'No se ingresaron datos para ingresar una nueva receta'});
//   try{
//     const createRecipe = await Recipe.create(newRecipe);
//     return res.send(createRecipe);
//   }catch(error){
//     next(error);
//   } 
// }



module.exports = {
  getAllRecipes,
  addRecipe
}

/**
Se debe desarrollar un servidor en Node/Express con las siguientes rutas:

[ ] GET /recipes => MOSTRAR LAS PRIMERAS 9 RECETAS POR PANTALLA

[ ] GET /recipes?name="...":
Obtener un listado de las primeras 9 recetas que contengan la palabra ingresada como query paraeter
Si no existe ninguna receta mostrar un mensaje adecuado
/// usar el name de query parameters

[ ] GET /recipes/{idReceta}:
Obtener el detalle de una receta en particular
Debe traer solo los datos pedidos en la ruta de detalle de receta
Incluir los tipos de dieta asociados

[ ] GET /types:
Obtener todos los tipos de dieta posibles
En una primera instancia, cuando no exista ninguno, deberán precargar la base de datos con los tipos de datos 
indicados por spoonacular acá

[ ] POST /recipe:
Recibe los datos recolectados desde el formulario controlado de la ruta de creación de recetas por body
Crea una receta en la base de datos
 */

// Opcionales
// BORRAR UNA RECETA 

// MODIFICAR UNA RECETA