import React       from 'react'
import Book        from './Book'
import { gql }     from 'apollo-boost'
import { graphql } from 'react-apollo'
import map         from 'lodash/fp/map'

const getBooksQuery = gql`
  {
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

const Thead = ({children}) => <div className='w-1/3 bold px-4 py-2'>{children}</div>

class BookList extends React.Component {
  render(){
    const { loading, error, books } = this.props.data

    return (
      <div className='flex flex-col'>
        <div className='flex flex-row p-1 w-full'>
          <Thead>Name</Thead>
          <Thead>Genre</Thead>
          <Thead>Author</Thead>
        </div>
        <div className='w-full'>
          {loading && <div className='text-center px-4 py-2'>loading...</div>}
          {error && <div className='text-red-darkest text-center px-4 py-2'>Error: {error}</div>}
          {books && map(b => <Book key={b.id} book={b} />, books)}
        </div>
      </div>
    )
  }
}


export default graphql(getBooksQuery)(BookList)
