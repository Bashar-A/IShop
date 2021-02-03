const Attribute = require('./model');
let {
    // Здесь базовые типы GraphQL, которые нужны в этом уроке
    GraphQLString,
    GraphQLList,
    GraphQLObjectType,
    /* Это необходимо для создания требований
       к полям и аргументам */
    GraphQLNonNull,
    // Этот класс нам нужен для создания схемы
    GraphQLSchema
} = require('graphql');

const AttributeType = new GraphQLObjectType({
    name: "Attribute",
    description: "This represent an attribute",
    fields: () => ({
        _id: { type: new GraphQLNonNull(GraphQLString)},
        name: { type: new GraphQLNonNull(GraphQLString)},
        description: {type: GraphQLString},
        //createdAt: {type: GraphQLString},
        //updatedAt: {type: GraphQLString}
    })
});


const AttributeQueryRootType = new GraphQLObjectType({
    name: "AttributeSchema",
    description: "Attributes Schema Query Root",
    fields: () => ({
        attributes: {
            type: new GraphQLList(AttributeType),
            description: "List of all Attributes",
            resolve: function(parentValues, args, context, info) {
                return Attribute.find({})
            }
        }
    })
});

// const CreateUserInputType = new GraphQLInputObjectType({
//     name: 'CreateUserInput',
//     description: 'Input payload for creating user',
//     fields: () => ({
//       username: {
//         type: new GraphQLNonNull(GraphQLString),
//       },
//       email: {
//         type: GraphQLString,
//       },
//       phone: {
//         type: GraphQLString,
//       },
//       firstName: {
//         type: GraphQLString,
//       },
//       lastName: {
//         type: GraphQLString,
//       },
//     }),
//   });
const AttributeMutationRootType = new GraphQLObjectType({
    name: "AttributeSchema2",
    description: "Attributes Schema Query Root",
    addAttribute:{
    resolve: function(parentValues, args, context, info) {
        return Attribute.find({})
    }
}
        
});

const AttributeSchema = new GraphQLSchema({
    query: AttributeQueryRootType
    //mutation: AttributeMutationRootType
    /* Если вам понадобиться создать или 
       обновить данные, вы должны использовать
       мутации. 
       Мутации не будут изучены в этом посте.
       mutation: BlogMutationRootType
    */
});

module.exports = AttributeSchema;