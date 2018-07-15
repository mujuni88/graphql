import React           from 'react'
import { graphql }     from 'react-apollo'
import map             from 'lodash/fp/map'
import {getBooksQuery} from '../../queries'

class BookList extends React.Component {
  displayContent = () => {
    const { books = [] } = this.props.data

    return map(book => <Book key={book.id} book={book} />, books)
  }

  displayLoading = () => {
    const {loading} = this.props.data

    return  loading && <div className='text-center px-4 py-2'>loading...</div>
  }

  displayError = () => {
    const {error} = this.props.data

    return error && <div className='text-red-darkest text-center px-4 py-2'>Error: {error}</div>
  }

  render(){
    return (
      <div className='flex flex-col mb-5'>
        <h1>My Reading List</h1>
        <div className='w-full'>
          {this.displayLoading()}
          {this.displayError()}
          <ul>
            {this.displayContent()}
          </ul>
        </div>
      </div>
    )
  }
}

const Book = ({book}) => (
  <li><b>{book.name}</b> by {book.author.name}</li>
)



export default graphql(getBooksQuery)(BookList)
