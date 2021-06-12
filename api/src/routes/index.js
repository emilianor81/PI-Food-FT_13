const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const RecipeRoutes = require('./recipe')
const DietRoutes = require('./diet')
const RecipesRoutes = require('./recipes');
// const { route } = require('./recipe');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// router.use('/recipes/:id/information', RecipeDetail )
router.use('/recipes',RecipesRoutes)
router.use('/types',DietRoutes);
router.use('/recipe',RecipeRoutes);

// router.use('/recipe', RecipeRout

module.exports = router;


