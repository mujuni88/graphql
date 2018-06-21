import React, { Component } from 'react'
import ApolloClient         from 'apollo-boost'
import { ApolloProvider }   from 'react-apollo'
import gql                  from 'graphql-tag'
import { Query }            from 'react-apollo'
import BookList             from './books/components/BookList'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})

const query = gql`
  query {
    books {
      name
      genre
      author {
        name
      }
      id
    }
  }
`

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className='container px-4'>
          <Query query={query}>
            {({ loading, error, data }) => {
              if (loading) {
                return <span>loading...</span>
              } else if (error) {
                return <span>Error: {error}</span>
              } 

              return (
                <div className="m-2 p-2 border-1 bg-blue rounded">
                  <h1 className="mb-2 border-b-1">Books</h1>
                  <BookList books={data.books} />
                </div>
              )
            }}
          </Query>
        </div>
      </ApolloProvider>
    )
  }
}

export default App
