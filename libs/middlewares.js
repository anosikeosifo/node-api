import bodyParser from 'body-parser';
import express from 'express';

module.exports = app => {
  app.set('json spaces', 4);
  app.set('port', 2400);
  app.use(bodyParser.json());
  app.use(app.auth.initialize())
  app.use((req, res, next) => {
    delete req.body.id;
    next();
  });

  app.use(express.static('public'));
}
