const { Router } = require('express');
const router = Router();
const uploadFile = require('../middlewares/multer');

const {
    getRecipes,
    getRecipe,
    postRecipe,
    addFoodToRecipe,
    addStepToRecipe,
    getRecipeByFood,
    getFoodOfRecipe,
    getStepsByRecipe,
    postRecipeImages,
    getImagesFromRecipe, 
    getAllFood,
    deleteRecipe,
    deleteImage,
    getImageFromRecipe,
    getRecipeByName
} = require('../controllers/recipes.controller.js')

router.get('/', getRecipes);
router.get('/:id', getRecipe);
router.post('/:id_usuario', postRecipe);
router.post('/:id/agregarAlimentos', addFoodToRecipe);
router.post('/:id/agregarPaso', addStepToRecipe);
router.get('/obtenerReceta/alimentos', getRecipeByFood);
router.get('/obtenerReceta/nombreReceta', getRecipeByName);
router.get('/:id/alimentos', getFoodOfRecipe);
router.get('/:id/pasos', getStepsByRecipe);
router.post('/:id/imagenes', uploadFile(), postRecipeImages);
router.get('/:id/imagenes', getImagesFromRecipe);
router.get('/:id/imagen', getImageFromRecipe);
router.get('/obtenerAlimentos', getAllFood);
router.get('/:id_usuario/eliminarReceta/:id_receta', deleteRecipe);
router.post('/:id_usuario/eliminarImagen/:id_receta', deleteImage);

module.exports = router;