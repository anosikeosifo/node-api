import jwt from 'jwt-simple';

module.exports = app => {
  const config = app.config;
  const User = app.db.models.User;

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
