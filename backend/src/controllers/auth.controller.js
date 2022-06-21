const dotenv = require('dotenv');
dotenv.config({path: '.env'});
const connection = require('../db/database');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function register(req, res){
    let pass = await encryptPassword(req.body.password);

    const sql = 'INSERT INTO usuarios SET ?';
    const body = {
        ...req.body,
        contraseña: pass
    }
    delete body['password'];
    delete body['passConf'];

    await connection.query(sql, [body], async(err, results) => {
        if(err){
            res.status(400).send('Ya hay un usuario registrado con ese email o faltan campos');
        } else{
            res.status(200).json({msg: 'El usuario ha sido registrado correctamente'});
        }
    });
    
}

async function login(req, res) {
    const { email, password } = req.body;

    if(email && password){
        const sql = 'SELECT * FROM usuarios WHERE email = ?';

        await connection.query(sql, [email], async(err, results) => {
            if(results.length == 0 || await validatePassword(password, results[0].contraseña) == false){
                res.status(400).send('Credenciales inválidas');
            } else{
                const token = jwt.sign({id: results[0].id}, "recetasSecret", {
                    expiresIn: 60 * 60 * 24
                });
                
                res.status(200).header('Authorization', token).json({token: token, id: results[0].id, msg: 'Login completado'});
            }
        });
    }
}

async function encryptPassword(password){
    const salt = await bcryptjs.genSalt(10);

    return bcryptjs.hash(password, salt);
}

function validatePassword(password, passwordDB){
    return bcryptjs.compare(password, passwordDB);
}

module.exports = {
    login,
    register
}