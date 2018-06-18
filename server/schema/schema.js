const graphql = require('graphql')

const find = require('crocks/Maybe/find')
const filter = require('crocks/pointfree/filter')
const prop = require('crocks/Maybe/prop')

const { 
  GraphQLObjectType, 
  GraphQLString, 
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql


const books = [
  {id: '1', name: 'Name of the Wind', genre: 'Fantasy', authorId: '1'},
  {id: '2', name: 'The Final Empire', genre: 'Fantasy', authorId: '2'},  
  {id: '3', name: 'The Long Earth', genre: 'Sci-Fi', authorId: '3'}
]

const authors = [
  {id: '1', name: 'Joe Buza', age: 1, books: ['1']},
  {id: '2', name: 'Buza Joe', age: 2, books: ['1', '2']},
  {id: '3', name: 'Steve Buza', age: 4, books: ['3']}
]
  

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id:   { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args){
        return filter(b => b.authorId === parent.id, books)
      }
    }
  })
})

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id:    { type: GraphQLID },
    name:  { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args){
        return find(author => author.id === parent.authorId, authors).option({})
      }
    }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: {id: { type: GraphQLID }},
      resolve(parent, args){
        return find(b => b.id === args.id, books).option({})
      }
    },
    books: {
      type: new GraphQLList(BookType),
      args: {id: { type: GraphQLID }},
      resolve(parent, args){
        return books
      }
    },
    author: {
      type: AuthorType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args){
        return find(a => a.id === args.id, authors).option({})
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      args: {id: {type: GraphQLID}},
      resolve(parent, args){
        return authors
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})
