var controller = require('../controllers/discussion');
var express = require('express');
var router = express.Router();

//router.get('/', controller.read);
//router.get('/:id', controller.readOne);
router.get('/:id', function(req, res){
        res.render('discussion');
});
//router.get('/room/:room', controller.readFromRoom);
router.post('/create', controller.create);
//router.put('/:id', controller.update);
//router.delete('/:id', controller.remove);

router.get('/create', function(req, res){ // moet in controlller
		res.render('discussionCreate');
});

module.exports = router;



/*
// example
app.get('/product/:id', function(req, res){
        Product.find({_id: req.params.id}, function (error, data) {
                if(error){
                        console.log(error);
                } else {
                        console.log("DATA :" + data[0]); //correct json object
                        res.render('product',{
                                title: 'Product Template',
                                result: data[0]
                                }
                        );
                }
        });

})
*/