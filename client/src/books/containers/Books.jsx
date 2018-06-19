import React     from 'react'
import { books } from '../data'
import BookList  from '../components/BookList'

export default class extends React.Component{
  state = {
    books: []
  }

  componentDidMount(){
    setTimeout(() => {
      this.setState({books})
    }, 1000)
  }

  render(){
    const { books } = this.state

    return (
      <div className='m-2 p-2 border-1 bg-blue rounded'>
        <h1 className='mb-2 border-b-1'>Books</h1>
        <BookList books={books} />
      </div>
    )
  }
}
