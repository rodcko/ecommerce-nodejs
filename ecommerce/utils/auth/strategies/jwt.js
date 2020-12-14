const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-http');
const boom = require('@hapi/boom');
const { config } = require('../../../config');
const MongoLib = require('../../../lib/mongo');

