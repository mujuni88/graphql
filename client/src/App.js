import React, { Component } from 'react'
import ApolloClient         from 'apollo-boost'
import { ApolloProvider }   from 'react-apollo'
import BookList             from './books/components/BookList'
import AddBook              from './books/components/AddBook'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className='container px-4'>
          <BookList />
          <AddBook />
        </div>
      </ApolloProvider>
    )
  }
}

export default App
