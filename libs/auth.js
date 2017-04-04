import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

module.exports = app => {
  const User = app.db.models.User;
  const config = app.config;
  const params = {
    secretOrKey: config.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeader()
  };

  const strategy = new Strategy(params, (payload, done) => {
    User.findById(payload.id)
      .then((user) => {
        if(user) {
          return done(null, {
            id: user.id,
            email: user.email,
          });
        }
        return done(null, false);
      })
      .catch(error => done(error, null));
  });

  passport.use(strategy);

  return app.auth = {
    initialize() {
      return passport.initialize();
    },
    authenticate() {
      return passport.authenticate('jwt', app.config.jwtSession);
    }
  }
};
