const { Router } = require('express');
const router = Router();

const {
    getUserInfo,
    followUser,
    unfollowUser,
    getRecipesByUser,
    getFollowers,
    getFollowing,
    getIsFollowing,
    updateProfile,
    getFavList,
    setRecipeAsFav, 
    removeRecipeFromFav,
    checkFav,
    getComments,
    getComment,
    addComment,
    removeComment
} = require('../controllers/user.controller');

router.get('/perfil/:id_usuario/info', getUserInfo);
router.post('/perfil/:id_usuario/:id_usuario2', followUser);
router.get('/perfil/:id_usuario/:id_usuario2', unfollowUser);
router.get('/perfil/:id_usuario/siguiendo/:id_usuario2', getIsFollowing);
router.get('/perfil/:id_usuario/recetas/all', getRecipesByUser);
router.get('/perfil/:id_usuario/seguidores', getFollowers);
router.get('/perfil/:id_usuario/seguidos', getFollowing);
router.post('/perfil/actualizar', updateProfile);
router.get('/:id_usuario', getFavList);
router.post('/:id_usuario', setRecipeAsFav);
router.get('/:id_usuario/:id_receta', removeRecipeFromFav);
router.get('/:id_usuario/check/:id_receta', checkFav);
router.get('/:id_receta/comentarios/all', getComments);
router.get('/:id_receta/comentario/:id_usuario', getComment);
router.post('/:id_receta/comentario/:id_usuario', addComment);
router.get('/:id_receta/eliminarComentario/:id_usuario', removeComment);

module.exports = router;
