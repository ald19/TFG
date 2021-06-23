const { Router } = require('express');
const router = Router();

const {
    getRecipes,
    getRecipe
} = require('../controllers/recipesController.js')

router.get('/', getRecipes);
router.get('/:id', getRecipe);

module.exports = router;