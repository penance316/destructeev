/*global app: true*/

(function () {
  'use strict';

  // set up ========================
  var express = require('express');
  var app = express();                                    // create our app w/ express
  var mongoose = require('mongoose');                     // mongoose for mongodb
  var morgan = require('morgan');                         // log requests to the console (express4)
  var bodyParser = require('body-parser');                // pull information from HTML POST (express4)
  var methodOverride = require('method-override');        // simulate DELETE and PUT (express4)
  var shortid = require('shortid');
  var config = require('./config.json');

  // configuration =================

  mongoose.connect(config.db, function (err) {
    if (err) {
      console.error(err);
    } else {
      console.log('Connected');
    }
  });

  app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
  app.use(morgan('dev'));                                         // log every request to the console
  app.use(bodyParser.urlencoded({extended: 'true'}));            // parse application/x-www-form-urlencoded
  app.use(bodyParser.json());                                     // parse application/json
  app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
  app.use(methodOverride());

  // define model =================
  var Message = mongoose.model('Message', {
    text: String,
    idhash: String
  });

  // routes ======================================================================

  // api ---------------------------------------------------------------------

  //get specific message
  app.get('/api/message/:messageid', function (req, res) {
    Message.findOne({ idhash: req.params.messageid }, function (err, message) {

      // if there is an error retrieving, send the error. nothing after res.send(err) will execute
      if (err) {
        return res.send(err);
      }

      if (message) {
        message.remove(function (err) {
          if (err) {
            return res.send(err);
          }
        });
      }

      res.json(message);
    });
  });

  // create message and send back id of message
  app.post('/api/message', function (req, res) {

    var idHash = shortid.generate();
    Message.create({
      text: req.body.text,
      idhash: idHash,
      done: false
    }, function (err) {
      if (err) {
        res.send(err);
      }

      // get and return all the todos after you create another
      res.send(idHash);
    });
  });

  // application -------------------------------------------------------------
  app.get('*', function (req, res) {
    res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
  });

  // listen (start app with node server.js) ======================================
  app.listen(8080);
  console.log('App listening on port 8080');

})();
