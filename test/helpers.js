import app from '../app.js';
import supertest from 'supertest';
import chai from 'chai';

global.app = app;
global.request = supertest(app);
global.expect = chai.expect;
