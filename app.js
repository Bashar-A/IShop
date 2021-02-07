const express = require('express');
const mongoose = require('mongoose');
const graphqlMiddleware = require('express-graphql')
const keys = require('./keys')
const { mergeSchemas, mergeResolvers } = require('@graphql-tools/merge');
let Schemas = []
let Resolvers = []

const MODULES = ['users','attributes'];

module.exports = function createApp(){
    const app = express();
    
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    app.use(express.urlencoded({extended: true}))
    app.use(express.json());

    MODULES.forEach((moduleName) => {
        try{
            const moduleSchema = require(`./modules/${moduleName}/schema.graphql`)
            Schemas.push(moduleSchema)
            const moduleResolver = require(`./modules/${moduleName}/resolvers`)
            Resolvers.push(moduleResolver)
        }catch(e){}
    });


    const mergedSchemas = mergeSchemas({schemas: Schemas})
    const mergedResolvers = mergeResolvers(Resolvers)

    

    app.all('/api', graphqlMiddleware.graphqlHTTP({
        schema: mergedSchemas,
        rootValue: mergedResolvers,
        graphiql: true
    })
    )


    mongoose.Promise = global.Promise;
    return mongoose.connect(keys.MONGODB_URI, {
        useNewUrlParser : true,
        useUnifiedTopology: true
    }).then(() => app);

   
    
}