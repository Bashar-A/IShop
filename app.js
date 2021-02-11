const express = require("express");
const mongoose = require("mongoose");
const graphqlMiddleware = require("express-graphql");
const keys = require("./keys");
const { mergeResolvers, mergeTypeDefs } = require("@graphql-tools/merge");
const { buildSchemaFromTypeDefinitions } = require("graphql-tools");
const cookieParser = require("cookie-parser");

let TypeDefs = [];
let Resolvers = [];
const MODULES = ["users", "attributes", "categories", "customers", "products", "reviews", "utils"];

module.exports = function createApp() {
  const app = express();

  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }
    next();
  });
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cookieParser());

  MODULES.forEach((moduleName) => {
    try {
      const moduleTypeDef = require(`./modules/${moduleName}/schema.graphql`);
      TypeDefs.push(moduleTypeDef);
      const moduleResolver = require(`./modules/${moduleName}/resolvers`);
      Resolvers.push(moduleResolver);
    } catch (e) {}
  });

  const mergedTypeDefs = mergeTypeDefs(TypeDefs);
  const mergedResolvers = mergeResolvers(Resolvers);

  const Schema = buildSchemaFromTypeDefinitions(mergedTypeDefs);

  app.use(
    "/api",
    graphqlMiddleware.graphqlHTTP({
      schema: Schema,
      rootValue: mergedResolvers,
      graphiql: true,
    })
  );

  mongoose.Promise = global.Promise;
  return mongoose
    .connect(keys.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => app);
};
