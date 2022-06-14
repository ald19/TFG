const { Router } = require('express');
const router = Router();

const {
    getFavList,
    setRecipeAsFav, 
    removeRecipeFromFav
} = require('../controllers/user.controller');

router.get('/:id_usuario', getFavList);
router.post('/:id_usuario', setRecipeAsFav);
router.get('/:id_usuario/:id_receta', removeRecipeFromFav);

module.exports = router;
