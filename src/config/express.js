const express = require('express');
const { logsRequestInterceptor, authClientId, authRealm, authServerUrl, sessionSecret, secure } = require('./vars');
const logger = require('./logger');
const bodyParser = require('body-parser');
const Keycloak = require('keycloak-connect');
const cors = require('cors')
const session = require('express-session');
const statistics = require('../controllers/statistics');

/**
* N.B.: The memory store is not scalable and the documentation states that there is a memory leak.
* Consequently, this is not suited for production use.
* Eventually replace with https://github.com/tj/connect-redis
**/
const memoryStore = new session.MemoryStore();

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: true,
  store: memoryStore
}));

// Request Logging Interceptor
if(logsRequestInterceptor === 'true') {
  app.use(function(req, res, next){
    logger.info("REQ: ", req.body);
    next();
  });
}

if(true === secure){
  // Initialize Keycloak middleware
  const keycloakConfig = {
    clientId: authClientId,
    bearerOnly: true,
    serverUrl: authServerUrl,
    realm: authRealm,
  };
  const keycloakOptions = {
    store: memoryStore
  };

  const keycloak = new Keycloak(keycloakOptions, keycloakConfig);
  app.use(keycloak.middleware());

  app.use('/cqdg/graphql', keycloak.protect(), function (req, res, next){
    const token = req.kauth.grant.access_token.content;
    const permissions = token.authorization ? token.authorization.permissions : undefined;
    next();
  });
}

// Routes
app.get('/stats', statistics);

module.exports = app;