var express = require('express');
var router = express.Router();
var Food_Controller = require('../controllers/food');

router.get('/', Food_Controller.homelist);
router.get('/food/delete/:id', Food_Controller.delete_Food);
router.get('/create_edit', Food_Controller.new);
router.get('/create_edit/:id', Food_Controller.edit_Data);

router.post('/create_edit', Food_Controller.add_item);
router.post('/create_edit/:id', Food_Controller.update_Item);

module.exports = router;