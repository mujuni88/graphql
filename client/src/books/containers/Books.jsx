import React     from 'react'
import BookList  from '../components/BookList'
import { Query } from 'react-apollo'

export default () => (
  <Query>
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
)
