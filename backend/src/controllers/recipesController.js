const dotenv = require('dotenv');
dotenv.config({path: '.env'});
const connection = require('../db/database');

async function getRecipes(req, res){
    const sql = 'SELECT * FROM recetas';
    await connection.query(sql, async(err, results) => {
        if(err){
            console.log(err);
        }
        else if(results.length == 0){
            res.status(404).send('No se han encontrado resultados');
        } else{
            res.status(200).json(results);
        }
    })
}

async function getRecipe(req, res){
    const { id } = req.params;
    const sql = 'SELECT * FROM recetas WHERE id = ?';
    await connection.query(sql, [id], async(err, results) => {
        if(err){
            console.log(err);
        }
        else if(results.length == 0){
            res.status(404).send('No se han encontrado resultados');
        } else{
            res.status(200).json(results[0]);
        }
    })
}

module.exports = {
    getRecipes,
    getRecipe
}