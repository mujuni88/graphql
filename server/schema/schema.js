const graphql = require('graphql')

const find = require('crocks/Maybe/find')
const prop = require('crocks/Maybe/prop')

const equals = require('crocks/pointfree/equals')

const compose = require('crocks/helpers/compose')
const liftA2 = require('crocks/helpers/liftA2')

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql


const books = [
  {id: '1', name: 'Name of the Wind', genre: 'Fantasy'},
  {id: '2', name: 'The Final Empire', genre: 'Fantasy'},
  {id: '3', name: 'The Long Earth', genre: 'Sci-Fi'},
]

  
const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: {id: { type: GraphQLString }},
      resolve(parent, args){
        return find(b => b.id === args.id, books).option({})
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})
