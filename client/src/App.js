import React, { Component } from 'react'
import ApolloClient         from 'apollo-boost'
import { ApolloProvider }   from 'react-apollo'
import BookList             from './books/components/BookList'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className='container px-4'>
          <BookList />
        </div>
      </ApolloProvider>
    )
  }
}

export default App
