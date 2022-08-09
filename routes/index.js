//const ObjectID = require('mongodb').ObjectID;

module.exports = function (app) {

  app.get('/', function (req, res, next) {
    if(req.session.user != null ) {
      res.render('index', {authorized: true, user: req.session.user});
    } else {
      res.render('index', {authorized: false});
    }
  });

  app.get('/login', require('./login').get);
  app.post('/login', require('./login').post);
  app.get('/logout', require('./logout').get);
  app.get('/registration', require('./registration').get);
  app.post('/registration', require('./registration').post);

  app.get('/users/:uid/courses', require('./userCourses').get);
  app.get('/constructor/:cid', require('./constructor').get);

  //app.get('/:id/courses/', require('./courses').get);
  //
  // app.get('/users', function (req, res, next) {
  //   User.find({}, function (err, users) {
  //     if (err) return next(err);
  //     res.json(users);
  //   })
  // });
  //
  // app.get('/user/:id', function (req, res, next) {
  //   try {
  //     let id = new ObjectID(req.params.id)
  //   } catch (e) {
  //       return next(404, "User not found");
  //   }
  //   User.findById(req.params.id, function (err, user) {
  //     if (err) { return next(err) }
  //     if(!user){
  //       return next(404, "User not found")
  //     }
  //     res.json(user);
  //   });
  // });
};