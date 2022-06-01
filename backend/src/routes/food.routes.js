const { Router } = require('express');
const router = Router();

const {
    getAllFood
} = require('../controllers/recipes.controller.js');

router.get('/', getAllFood);

module.exports = router;