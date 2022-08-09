const express = require('express');
const path = require('path');
const http = require('http');
const config = require('config');
const mongoose = require('libs/mongoose');
const log = require('libs/log')(module);

const HttpError = require('error').HttpError;
const errorHandler = require('errorhandler')();

//const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

//const logger = require('morgan');
//const debug = require('debug')('projectquest:server');
//const indexRouter = require('./routes/index');
//const usersRouter = require('./routes/users');

let app = express();

app.engine('ejs', require('ejs-locals'));
app.set('views', __dirname + '/templates');
app.set('view engine', 'ejs');

app.use(express.json()); // req.body...
app.use(cookieParser()); // req.cookies...

app.use(session({
    secret: config.get('session:secret'),
    key: config.get('session:key'),
    cookie: config.get('session:cookie'),
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

/*app.use(function (req, res, next) {
   req.session.numberOfVisits = req.session.numberOfVisits + 1 || 1;
   res.send("visits: " + req.session.numberOfVisits);
});*/

app.use(require('middleware/sendHttpError'));
app.use(require('middleware/loadUser'));

require('routes')(app);
require('API')(app);

app.use(function (err, req, res, next) {
    if (typeof err == 'number') {
        err = new HttpError(err);
    }
    if (err instanceof HttpError) {
        res.sendHttpError(err);
    } else {
        if (app.get('env') == 'development'){
            errorHandler(err, req, res, next);
        } else {
            log.error(err);
            err = new HttpError(500);
            res.sendHttpError(err);
        }
    }
});

app.use(express.static(path.join(__dirname, 'public')));

http.createServer(app).listen(config.get('port'), function () {
  log.info('Server listening on port' + config.get('port'));
});

// server.on('error', onError);
// server.on('listening', onListening);
//
// function onError(error) {
//   if (error.syscall !== 'listen') {
//     throw error;
//   }
//
//   const bind = typeof port === 'string'
//       ? 'Pipe ' + port
//       : 'Port ' + port;
//
//   // handle specific listen errors with friendly messages
//   switch (error.code) {
//     case 'EACCES':
//       console.error(bind + ' requires elevated privileges');
//       process.exit(1);
//       break;
//     case 'EADDRINUSE':
//       console.error(bind + ' is already in use');
//       process.exit(1);
//       break;
//     default:
//       throw error;
//   }
// }
//
// function onListening() {
//   const addr = server.address();
//   const bind = typeof addr === 'string'
//       ? 'pipe ' + addr
//       : 'port ' + addr.port;
//   debug('Listening on ' + bind);
// }

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
// app.use(function(req, res, next) {
//   if (req.url == '/'){
//     res.end('Hello');
//   } else {
//     next();
//   }
// });
//
// app.use(function(req, res, next) {
//   if (req.url == '/test') {
//     res.end('Test');
//   } else {
//     next();
//   }
// });
//
// app.use(function(req, res, next) {
//   res.send(404, 'Ooops, page not found!');
// });
