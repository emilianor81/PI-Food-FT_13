const { Router } = require('express');
const RecipeRoutes = require('./recipe')
const DietRoutes = require('./diet')
const RecipesRoutes = require('./recipes');
const LoadBdRoutes = require('./load')

const router = Router();

// Configurar los routers
router.use('/recipes',RecipesRoutes)
router.use('/types',DietRoutes);
router.use('/recipe',RecipeRoutes);
router.use('/load', LoadBdRoutes)


module.exports = router;


