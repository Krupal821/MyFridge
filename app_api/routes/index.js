var express = require('express');
var router = express.Router();
var ctrlFood = require('../controllers/food');

router.get('/food', ctrlFood.get_Food);
router.get('/food/:id', ctrlFood.getFoodById);
router.post('/food', ctrlFood.new_Food);
router.delete('/food/:id', ctrlFood.delete_Food);
router.put('/food/:id', ctrlFood.update_Food);

module.exports = router;