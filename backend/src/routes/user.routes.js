const { Router } = require('express');
const router = Router();

const {
    getFavList,
    setRecipeAsFav, 
    removeRecipeFromFav,
    checkFav,
    getComments,
    getComment,
    addComment,
    removeComment
} = require('../controllers/user.controller');

router.get('/:id_usuario', getFavList);
router.post('/:id_usuario', setRecipeAsFav);
router.get('/:id_usuario/:id_receta', removeRecipeFromFav);
router.get('/:id_usuario/check/:id_receta', checkFav);
router.get('/:id_receta/comentarios/all', getComments);
router.get('/:id_receta/comentario/:id_usuario', getComment);
router.post('/:id_receta/comentario/:id_usuario', addComment);
router.get('/:id_receta/eliminarComentario/:id_usuario', removeComment);

module.exports = router;
