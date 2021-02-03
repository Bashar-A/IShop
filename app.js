const express = require('express');
const mongoose = require('mongoose');
const graphqlMiddleware = require('express-graphql')
const keys = require('./keys')

const { buildSchema } = require('graphql');

let schema = buildSchema(`
  type Query {
    postTitle: String,
    blogTitle: String
  }
`);

let root = {
    postTitle: () => {
      return 'Build a Simple GraphQL Server With Express and NodeJS';
    },
    blogTitle: () => {
      return 'scotch.io';
    }
  };

const MODULES = ['auth', 'users', 'posts', 'comments'];

module.exports = function createApp(){
    const app = express();
    
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    app.use(express.urlencoded({extended: true}))
    app.use(express.json());

    app.all('/api', graphqlMiddleware.graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true
    })
    )


    /*MODULES.forEach((moduleName) => {
        const appModule = require(`./modules/${moduleName}`);

        if (typeof appModule.configure === 'function') {
            appModule.configure(app);
        }
    });*/

    mongoose.Promise = global.Promise;
    return mongoose.connect(keys.MONGODB_URI, {
        useNewUrlParser : true,
        useUnifiedTopology: true
    }).then(() => app);
}