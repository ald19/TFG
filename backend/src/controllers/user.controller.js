const dotenv = require('dotenv');
dotenv.config({path: '.env'});
const connection = require('../db/database');

async function getFavList(req, res){
    const {id_usuario} = req.params;
    const sql = 'SELECT r.*, u.nickname FROM recetas_favoritas f LEFT JOIN recetas r ON f.id_receta = r.id LEFT JOIN usuarios u ON f.id_usuario = u.id WHERE f.id_usuario = ? ORDER BY r.fecha_publicacion DESC';

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
    const sql = 'SELECT * FROM comentarios WHERE id_receta = ?';

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
    WHERE id = ${id_receta}`;
    await connection.query(sql2, async(err, results) => {
        if(err){
            console.log(err);
        } else{
            res.status(200).json({msg: 'Se ha actualizado la valoración de la receta correctamente'});
        }
    });
} 

module.exports = {
    getFavList,
    setRecipeAsFav,
    removeRecipeFromFav,
    checkFav,
    getComments,
    getComment,
    addComment,
    removeComment
}
