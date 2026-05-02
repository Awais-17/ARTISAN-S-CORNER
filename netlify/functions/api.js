const serverless = require('serverless-http');
const app = require('../../server/app');
const connectDB = require('../../server/config/db');

let cachedHandler;

const handler = async (event, context) => {
  if (!cachedHandler) {
    await connectDB();
    cachedHandler = serverless(app);
  }
  return cachedHandler(event, context);
};

module.exports.handler = handler;
