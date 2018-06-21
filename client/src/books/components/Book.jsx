import React from 'react'

export default ({book}) => (
  <tr>
    <td>{book.name}</td>
    <td>{book.genre}</td>
    <td>{book.author.name}</td>
  </tr>
)
