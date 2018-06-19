import React from 'react'
import Book  from './Book'

export default ({books}) => (
  <table>
    <thead>
      <tr className='bold text-lg'>
        <td>Name</td>
        <td>Genre</td>
        <td>Author</td>
      </tr>
    </thead>
    <tbody>
      {books.map(b => <Book key={b.id} book={b} />)}
    </tbody>
  </table>
)
