const { Router } = require('express');
const router = Router();

const {
    getRecipes,
    getRecipe,
    postRecipe,
    addFoodToRecipe,
    addStepToRecipe
} = require('../controllers/recipes.controller.js')

router.get('/', getRecipes);
router.get('/:id', getRecipe);
router.post('/:id_usuario', postRecipe);
router.post('/:id/agregarAlimento', addFoodToRecipe);
router.post('/:id/agregarPaso', addStepToRecipe);

module.exports = router;