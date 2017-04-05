import jwt from 'jwt-simple';

module.exports = app => {
  const config = app.config;
  const User = app.db.models.User;

  /**
  * @api {post} /token  Authentication token
  * @apiGroup Credentials
  * @apiParam {String} email User Email
  * @apiParam {String} password User Password
  * @apiParamExample {json} Input
  * {
  *   "email" : "test@useremail.com",
  *   "password": "$*(_rfvsefvsfddf"
  * }
  *
  * @apiSuccess {String} token Token of authenticated user
  * @apiSuccessExample {json} Success
  *   HTTP/1.1 200 OK
  *   {
  *     "token": "23rfvew43dcd53gdvx_wrfdf"
  *   }
  *
  * @apiErrorExample {json} Authentication Error
  *   HTTP/1.1 401 Unauthorized
  **/

  app.post('/token', (req, res) => {
    if(req.body.email && req.body.password) {
      const email = req.body.email;
      const password = req.body.password;

      User.findOne({ where: { email: email } })
        .then((user) => {
          //if the password in the request matche that from the db.
          if(User.isPassword(user.password, password)) {
            const payload = { id: user.id };
            res.json({
              token: jwt.encode(payload, config.jwtSecret)
            });
          } else {
            res.status(401)
              .json({ status: false, message: 'Invalid credentials provided' });
          }
        })
        .catch((error) => {
          res.status(401)
            .json({ status: false, message: 'Invalid credentials provided' });
        })
    } else {
      res.status(401)
        .json({ status: false, message: 'Invalid credentials provided' });
    }
  })


}
