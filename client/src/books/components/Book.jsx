import React from 'react'

const Item = ({children}) => <div className='w-1/3 bg-grey-light bold px-4 py-2'>{children}</div>

export default function Book({book}){
  return (
    <div className='flex flex-row p-1 w-full'>
      <Item>{book.name}</Item>
      <Item>{book.genre}</Item>
      <Item>{book.author.name}</Item>
    </div>
  )
}
