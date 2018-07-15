import React            from 'react'
import { graphql }      from 'react-apollo'
import {getBookQuery}   from '../../queries'
import { 
  Card, 
  CardText, 
  CardBody,
  CardTitle, 
} from 'reactstrap'

class BookDetails extends React.Component {
  displayDetails = () => {
    const { loading, book } = this.props.data

    if(loading){
      return <div className='text-center'>Loading...</div>
    }

    return (
      <React.Fragment>
        <CardTitle>{book.name}</CardTitle>
        <CardText>Genre: {book.genre}</CardText>
        <CardText>Author: {book.author.name}</CardText>
        <CardText>Age: {book.author.age}</CardText>
        <CardTitle className='mt-2'>Author's books</CardTitle>
        <ul>
          {book.author.books.map(b => <li key={b.id}><CardText>{b.name}</CardText></li>)}
        </ul>
      </React.Fragment>
    )
  }

  render(){
    return (
      <div>
        <h1>Book Details</h1>
        <Card className='mt-2'>
          <CardBody>
            {this.displayDetails()}
          </CardBody>
        </Card>
      </div>
    )
  }
}

export default graphql(getBookQuery, { 
  options: (props) => {
    return {
      variables: {
        id: props.bookId
      }
    }
  }
})(BookDetails)
