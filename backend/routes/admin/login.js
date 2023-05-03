var express = require('express');
var router = express.Router();
var usersModel = require('./../../models/usersModel');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin/login', {
    layout:'admin/layout'
  });
});

router.get('/logout', function(req, res, next){
  req.session.destroy();
  res.render('admin/login', {
    layout: 'admin/layout'
  });
});

router.post('/', async(req, res, next) => {
  try {
    var user = req.body.user;
    var password = req.body.password;

    var data = await usersModel.getUserByUsernameAndPassword(user, password);

    if(data != undefined){
      req.session.id_usuario = data.id;
      req.session.nombre = data.user;
      res.redirect('/admin/novedades');
    } else {
      res.render('admin/login', {
        layout: 'admin/layout',
        error: true
      });
    }
  } catch(error){
    console.log(error);
  }
})

module.exports = router;