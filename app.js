import express from 'express';
import consign from 'consign';
const app = express();

require('./libs/config.js')(app);
require('./libs/db.js')(app);
require('./libs/auth.js')(app);
require('./libs/middlewares.js')(app);
require('./routes')(app);
require('./libs/boot.js')(app);

module.exports = app;
