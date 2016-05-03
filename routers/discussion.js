var controller = require('../controllers/discussion');
var express = require('express');
var router = express.Router();



router.get('/create', function(req, res){
    // paginas renderen moet eigenlijk in controlller
    res.render('discussionCreate');
});
router.post('/create', controller.create);
//router.put('/:id', controller.update);
//router.delete('/:id', controller.remove);
router.get('/:id', controller.getOne);

module.exports = router;