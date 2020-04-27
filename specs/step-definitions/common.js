const { loadFeature, defineFeature } = require("jest-cucumber");
const request = require("supertest");
const server = require("../../data/server");
const userModel = require("../../users/users-model");
const genHeaders = (authToken) => {
  return {
    Authorization: `${authToken}`,
    [`Access-Control-Allow-Origin`]: "*",
    [`Access-Control-Allow-Methods`]: "GET,PUSH,POST,PATCH,DELETE,OPTIONS,PUT",
  };
};

module.exports = {
  loadFeature,
  defineFeature,
  request,
  server,
  userModel,
  genHeaders,
};
