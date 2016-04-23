var controller = require('./../controllers/discussion');
var express = require('express');
var router = express.Router();

//router.get('/', controller.read);
//router.get('/:id', controller.readOne);
//router.get('/room/:room', controller.readFromRoom);
router.post('/create', controller.create);
//router.put('/:id', controller.update);
//router.delete('/:id', controller.remove);

router.get('/create', function(req, res){
		res.render('discussionCreate');
});

module.exports = router;