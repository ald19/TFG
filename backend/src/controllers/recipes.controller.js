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
    });
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
    });
}

async function postRecipe(req, res){
    const { id_usuario } = req.params;
    const { name, description, duration, extra } = req.body;

    const sql = 'INSERT INTO recetas SET ?';
    const body = {
        nombre: name, 
        descripcion: description ? description : null,
        duracion: duration ? duration : null,
        extra: extra ? extra : null,
        fecha_publicacion: new Date(),
        id_usuario: id_usuario
    }

    await connection.query(sql, [body], async(err, results) => {
        if(err){
            res.status(400).send('Faltan campos o no existe el usuario');
        } else{
            res.status(200).send('La receta se ha publicado correctamente');
        }
    });
}

async function addFoodToRecipe(req, res){
    const { id } = req.params;
    const { id_food, quantity} = req.body;

    const sql = 'INSERT INTO alimentos_recetas SET ?';
    const body = {
        id_alimento: id_food,
        id_receta: id,
        cantidad: quantity
    }

    await connection.query(sql, [body], async(err, results) => {
        if(err){
            res.status(400).send('Faltan campos, ya has añadido el alimento o no existe la receta y/o el alimento');
        } else{
            res.status(200).send('Se ha añadido el alimento correctamente');
        }
    });
}

async function addStepToRecipe(req, res){
    const { id } = req.params;
    const { description } = req.body;

    const sql = 'INSERT INTO pasos SET ?';
    const body = {
        descripcion: description,
        id_receta: id
    }

    await connection.query(sql, [body], async(err, results) => {
        if(err){
            res.status(400).send('Faltan campos o la receta no existe');
        } else{
            res.status(200).send('Se ha añadido el paso correctamente');
        }
    });
}

async function getRecipeByFood(req, res){
    const query = req.query;
    const alimentos = [];

    for(var alimento in query){
        if(query.hasOwnProperty(alimento)){
            alimentos.push(Number(query[alimento]));
        }
    }

    const sql = 'SELECT id_receta, GROUP_CONCAT(id_alimento) AS alimentos FROM alimentos_recetas WHERE id_alimento IN (?) GROUP BY id_receta';
    await connection.query(sql, [alimentos], async(err, results) => {
        if(err){
            console.log(err);
        } else{
            let recipes = await checkRecipeContainsFood(alimentos, results)
            res.status(200).json(recipes);
        }
    });
}

async function checkRecipeContainsFood(food, results){
    let recipes = [];

    for(var i = 0; i < results.length; i++){
        let cont = 0;

        food.forEach(aux => {
            if(results[i].alimentos.includes(aux.toString())){
                cont++;
            }
        })
        if(cont == food.length){
            recipes.push({ id_receta: results[i].id_receta });
        }
    }

    return recipes;
}

module.exports = {
    getRecipes,
    getRecipe,
    postRecipe,
    addFoodToRecipe,
    addStepToRecipe,
    getRecipeByFood
}