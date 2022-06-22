const dotenv = require('dotenv');
dotenv.config({path: '.env'});
const connection = require('../db/database');
const { encryptPassword, validatePassword } = require('./methods');

async function getUserInfo(req, res){
    const {id_usuario} = req.params;
    const sql = `
        SELECT id, nombre, nickname, email, fecha_nacimiento, (SELECT COUNT(*) FROM seguimientos s LEFT JOIN usuarios u ON s.id_usuario1 = u.id WHERE s.id_usuario2 = ${id_usuario}) as seguidores,
        (SELECT COUNT(*) FROM seguimientos s LEFT JOIN usuarios u ON s.id_usuario2 = u.id WHERE s.id_usuario1 = ${id_usuario}) as seguidos,
        (SELECT COUNT(*) FROM recetas r LEFT JOIN usuarios u ON r.id_usuario = u.id WHERE r.id_usuario = ${id_usuario}) as publicaciones
        FROM usuarios
        WHERE id = ${id_usuario}
    `;

    await connection.query(sql, async(err, results) => {
        if(err)
            console.log(err);
        else
            res.status(200).json(results[0]);
    });
}

async function getRecipesByUser(req, res){
    const {id_usuario} = req.params;
    const sql = `
        SELECT r.*, u.nickname, CASE WHEN r.id IN (SELECT id_receta FROM recetas_favoritas WHERE id_usuario = ${id_usuario}) THEN TRUE else FALSE END as fav,
        (SELECT COUNT(*) FROM recetas_favoritas WHERE id_receta = r.id) as me_gusta
        FROM recetas r 
        LEFT JOIN usuarios u ON r.id_usuario = u.id 
        WHERE r.id_usuario = ${id_usuario}
        ORDER BY fecha_publicacion DESC
    `;

    await connection.query(sql, async(err, results) => {
        if(err)
            console.log(err);
        else
            res.status(200).json(results);
    });
}

async function getFollowers(req, res){
    const {id_usuario} = req.params;
    const sql = 'SELECT u.id, u.nickname FROM seguimientos s LEFT JOIN usuarios u ON s.id_usuario1 = u.id WHERE s.id_usuario2 = ?';

    await connection.query(sql, [id_usuario], async(err, results) => {
        if(err)
            console.log(err);
        else
            res.status(200).json(results);
    });
}

async function getIsFollowing(req, res){
    const {id_usuario, id_usuario2} = req.params;
    const sql = `SELECT * FROM seguimientos WHERE id_usuario1 = ${id_usuario} AND id_usuario2 = ${id_usuario2}`;

    await connection.query(sql, async(err, results) => {
        if(err)
            console.log(err);
        else{
            if(results.length)
                res.status(200).json({following: true});
            else    
                res.status(200).json({following: false});
            
        }
    });
}

async function getFollowing(req, res){
    const {id_usuario} = req.params;
    const sql = 'SELECT u.id, u.nickname FROM seguimientos s LEFT JOIN usuarios u ON s.id_usuario2 = u.id WHERE s.id_usuario1 = ?';

    await connection.query(sql, [id_usuario], async(err, results) => {
        if(err)
            console.log(err);
        else
            res.status(200).json(results);
    });
}

async function followUser(req, res){
    const {id_usuario, id_usuario2} = req.params;
    const sql = 'INSERT INTO seguimientos SET ?';
    const body = {
        id_usuario1: id_usuario,
        id_usuario2: id_usuario2
    }

    await connection.query(sql, [body], async(err, results) => {
        if(err)
            console.log(err);
        else
            res.status(200).json({msg: 'Se ha seguido correctamente'});
    });
}

async function unfollowUser(req, res){
    const {id_usuario, id_usuario2} = req.params;
    const sql = 'DELETE FROM seguimientos WHERE id_usuario1 = ' + id_usuario + ' AND id_usuario2 = ' + id_usuario2;

    await connection.query(sql, async(err, results) => {
        if(err)
            console.log(err);
        else
            res.status(200).json({msg: 'Se ha dejado de seguir correctamente'});
    });
}

async function updateProfile(req, res){
    const {id_usuario} = req.body;
    const sql = 'SELECT * FROM usuarios WHERE id = ?';

    await connection.query(sql, [id_usuario], async(err, results) => {
        if(err)
            console.log(err);
        else{
            const sql2 = 'UPDATE usuarios SET ? WHERE id = ' + id_usuario;
            let body = req.body;

            if(req.body.password){
                body = {
                    ...body,
                    contraseña: await encryptPassword(req.body.newPassword)
                }
                delete body['password'];
                delete body['newPassword'];
                delete body['id_usuario'];

                if(await validatePassword(req.body.password, results[0].contraseña)){
                    await connection.query(sql2, [body], async(err, results) => {
                        if(err)
                            console.log(err);
                        else
                            res.status(200).json({msg: 'Se ha actualizado la información del usuario correctamente'});
                    });
                } else{
                    res.status(400).json({msg: 'La contraseña no es correcta'});
                }
            } else {
                delete body['id_usuario'];
                await connection.query(sql2, [body], async(err, results) => {
                    if(err)
                        res.status(400).json({msg: 'Faltan campos o son erroneos'});
                    else
                        res.status(200).json({msg: 'Se ha actualizado la información del usuario correctamente'});
                });
            }
        }
    });
}

async function getFavList(req, res){
    const {id_usuario} = req.params;
    const sql = `
        SELECT r.*, u.nickname, (SELECT COUNT(*) FROM recetas_favoritas WHERE id_receta = r.id) as me_gusta 
        FROM recetas_favoritas f 
        LEFT JOIN recetas r ON f.id_receta = r.id 
        LEFT JOIN usuarios u ON f.id_usuario = u.id 
        WHERE f.id_usuario = ? 
        ORDER BY r.fecha_publicacion DESC
    `;

    await connection.query(sql, [id_usuario], async(err, results) => {
        if(err)
            console.log(err);
        else
            res.status(200).json(results);
    });
}

async function setRecipeAsFav(req, res){
    const {id_receta} = req.body;
    const {id_usuario} = req.params;
    const sql = 'INSERT INTO recetas_favoritas SET ?';
    const body = {
        id_usuario: id_usuario,
        id_receta: id_receta
    }

    await connection.query(sql, [body], async(err, results) => {
        if(err){
            res.status(400).json({msg: 'Faltan campos, no existe el usuario o la receta'});
        } else{
            res.status(200).json({msg: 'La receta se ha guardado en favoritos correctamente'});
        }
    });
}

async function removeRecipeFromFav(req, res){
    const {id_receta, id_usuario} = req.params;
    const sql = 'DELETE FROM recetas_favoritas WHERE id_usuario = ' + id_usuario + ' AND id_receta = ' + id_receta;

    await connection.query(sql, async(err, results) => {
        if(err){
            console.log(err);
        } else{
            res.status(200).json({msg: 'Se ha eliminado la receta ' + id_receta + ' de favoritos correctamente'});
        }
    });
}

async function checkFav(req, res){
    const {id_receta, id_usuario} = req.params;
    const sql = 'SELECT * FROM recetas_favoritas WHERE id_usuario = ' + id_usuario + ' AND id_receta = ' + id_receta;

    await connection.query(sql, async(err, results) => {
        if(err){
            console.log(err);
        } else{
            res.status(200).json(results);
        }
    });
}

async function getComments(req, res){
    const {id_receta} = req.params;
    const sql = 'SELECT c.*, u.nickname FROM comentarios c LEFT JOIN usuarios u ON c.id_usuario = u.id WHERE id_receta = ?';

    await connection.query(sql, [id_receta], async(err, results) => {
        if(err){
            console.log(err);
        } else{
            res.status(200).json(results);
        }
    });
}

async function getComment(req, res){
    const {id_receta, id_usuario} = req.params;
    const sql = 'SELECT * FROM comentarios WHERE id_usuario = ' + id_usuario + ' AND id_receta = ' + id_receta;

    await connection.query(sql, async(err, results) => {
        if(err){
            console.log(err);
        } else{
            res.status(200).json(results);
        }
    });
}

async function addComment(req, res){
    const {id_receta, id_usuario} = req.params;
    const {comentario, valoracion} = req.body;
    const sql = 'INSERT INTO comentarios SET ?';
    const body = {
        id_receta: id_receta,
        id_usuario: id_usuario,
        comentario: comentario,
        valoracion: valoracion
    }

    await connection.query(sql, [body], async(err, results) => {
        if(err){
            console.log(err)
            res.status(400).json({msg: 'Faltan campos, no existe el usuario o la receta'});
        } else{
            updateRecipeRate(id_receta, res);
        }
    });
}

async function removeComment(req, res){
    const {id_receta, id_usuario} = req.params;
    const sql = 'DELETE FROM comentarios WHERE id_usuario = ' + id_usuario + ' AND id_receta = ' + id_receta;

    await connection.query(sql, async(err, results) => {
        if(err){
            console.log(err);
        } else{
            updateRecipeRate(id_receta, res);
        }
    });
}

async function updateRecipeRate(id_receta, res){
    const sql2 = `
        UPDATE recetas SET valoracion = (
            SELECT ROUND(AVG(valoracion)) as valoracion
            FROM comentarios
            WHERE id_receta = ${id_receta}
        )
        WHERE id = ${id_receta}
    `;
    await connection.query(sql2, async(err, results) => {
        if(err)
            console.log(err);
        else
            res.status(200).json({msg: 'Se ha actualizado la valoración de la receta correctamente'});
    });
} 

module.exports = {
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
}
