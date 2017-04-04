module.exports = app => {
  const env = process.env.NODE_ENV;

  if(env) {
    app.config = require(`./config.${env}.js`);
  } else {
    app.config = require('./config.development.js');
  }

  return app.config;
}
