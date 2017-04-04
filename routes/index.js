const tasks = require('./task.js')
const users = require('./user.js')
const token = require('./token.js')
module.exports = app => {
  /**
  *
  *@api {get} / Description
  *@apiGroup API description
  *@apiSuccess {String} appName description details
  *@apiSuccessExample {json} Success
  * { "appName": "ntask-api" }
  *
  **/
  app.get('/', (req, res) => {
    res.json({ appName: 'ntask-api' });
  });
  token(app)
  users(app);
  tasks(app);
};
