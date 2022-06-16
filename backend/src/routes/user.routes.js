const { Router } = require('express');
const router = Router();

const {
    getFavList,
    setRecipeAsFav, 
    removeRecipeFromFav,
    checkFav
} = require('../controllers/user.controller');

router.get('/:id_usuario', getFavList);
router.post('/:id_usuario', setRecipeAsFav);
router.get('/:id_usuario/:id_receta', removeRecipeFromFav);
router.get('/:id_usuario/check/:id_receta', checkFav);

module.exports = router;
