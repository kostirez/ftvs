// Path: ./config/env/production/server.js
// starting from Strapi v 4.6.1 server.js has to be the following

module.exports = ({ env }) => ({
  proxy: true,
  url: env('HOST_URL'), // Sets the public URL of the application.
  app: {
    keys: env.array('APP_KEYS')
  },
});

