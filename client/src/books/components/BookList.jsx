import React                     from 'react'
import { graphql }               from 'react-apollo'
import map                       from 'lodash/fp/map'
import {getBooksQuery}           from '../../queries'
import BookDetails               from './BookDetails'
import { Card, CardBody }        from 'reactstrap'

class BookList extends React.Component {
  state = {selectedBookId: null}

  handleOnBookClick = (id) => {
    this.setState({selectedBookId: id})
  }

  displayContent = () => {
    const { books = [] } = this.props.data

    return map(book => <Book key={book.id} book={book} onClick={this.handleOnBookClick}/>, books)
  }

  displayLoading = () => {
    const {loading} = this.props.data

    return  loading && <div className='text-center px-0 py-2'>loading...</div>
  }

  displayError = () => {
    const {error} = this.props.data

    return error && <div className='text-red-darkest text-center px-4 py-2'>Error: {error}</div>
  }

  render(){
    return (
      <div className='flex flex-col mb-5'>
        <h1>My Reading List</h1>
        <div className='w-full mt-2'>
          <Card className='mb-2'>
            <CardBody>
              {this.displayLoading()}
              {this.displayError()}
              <ul>
                {this.displayContent()}
              </ul>
            </CardBody>
          </Card>
          {this.state.selectedBookId && <BookDetails bookId={this.state.selectedBookId} />}
        </div>
      </div>
    )
  }
}

const Book = ({book, onClick}) => (
  <li 
    className='cursor-pointer text-blue hover:text-blue-light'
    onClick={() => onClick(book.id)}
  >
    <b>{book.name}</b> by {book.author.name}
  </li>
)



export default graphql(getBooksQuery)(BookList)
