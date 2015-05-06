'use strict';

var Secrets;

try{
    Secrets = require('./secrets');
}catch(ex){}

var env = process.env.NODE_ENV || 'development';

var common = {
  FIREBASE_SECRET: Secrets ? Secrets.FIREBASE_SECRET : process.env.FIREBASE_SECRET,
  FIREBASE_EXPIRE: 24
};

var environments = {
  development: {
    PORT: 8000,
    MONGO_URL: 'mongodb://localhost/roadtrip-dev'
  },
  test: {
    PORT: 0,
    MONGO_URL: 'mongodb://localhost/roadtrip-test'
  },
  production: {
    PORT: 0,
    MONGO_URL: 'mongodb://heroku_app36605635:4is6k8kr7ek4u3p9unhnp5vj43@ds063449.mongolab.com:63449/heroku_app36605635'
  }
};

var environment = environments[env];

Object.keys(common).forEach(function(key){
  environment[key] = common[key];
});

console.log('Environment:', environment);
exports.environment = environment;
