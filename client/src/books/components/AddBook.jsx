import React                from 'react'
import { graphql, compose } from 'react-apollo'
import map                  from 'lodash/fp/map'

import { 
  getAuthorsQuery, 
  addBookMutation, 
  getBooksQuery 
} from '../../queries'
import { 
  Button, 
  Form, 
  FormGroup, 
  Label, 
  Input 
} from 'reactstrap'

class AddBook extends React.Component {
  state = {}

  inputs = [
    { label: 'Book Name:', name: 'name', type: 'text' },
    { label: 'Genre:', name: 'genre', type: 'text' },
    { label: 'Author:', name: 'authorId', type: 'select' }
  ]

  constructor(props) {
    super(props)

    this.inputs.forEach(input => (this.state[input.name] = ''))
  }

  displayAuthors = () => {
    const { authors = [], loading } = this.props.getAuthorsQuery

    if (loading) {
      return <option>loading ...</option>
    }

    return map(author => <Author key={author.id} author={author} />, authors)
  }

  displayError = () => {
    const { error } = this.props.data

    return (
      error && (
        <div className="text-red-darkest text-center px-4 py-2">
          Error: {error}
        </div>
      )
    )
  }

  handleOnChange = e => {
    const { name, value } = e.target

    this.setState({ [name]: value })
  }

  handleOnSubmit = (e) => {
    e.preventDefault()

    const { name, genre, authorId } = this.state

    this.props.addBookMutation({
      variables:      {name, genre, authorId},
      refetchQueries: [{query: getBooksQuery}]
    })
  }

  render() {
    return (
      <div className="flex flex-col">
        <Form onSubmit={this.handleOnSubmit}>
          {map(input => {
            if (input.type === 'select') {
              return (
                <FormGroup key={input.name}>
                  <Label>{input.label}</Label>
                  <Input
                    type={input.type}
                    name={input.name}
                    value={this.state[input.name]}
                    onChange={this.handleOnChange}
                  >
                    <option>Select author</option>
                    {this.displayAuthors()}
                  </Input>
                </FormGroup>
              )
            }
            return (
              <FormGroup key={input.name}>
                <Label>{input.label}</Label>
                <Input
                  type={input.type}
                  name={input.name}
                  value={this.state[input.name]}
                  onChange={this.handleOnChange}
                />
              </FormGroup>
            )
          }, this.inputs)}
          <Button color="primary">+ Add Book</Button>
        </Form>
      </div>
    )
  }
}

const Author = ({ author }) => <option value={author.id}>{author.name}</option>

export default compose(
  graphql(getAuthorsQuery, { name: 'getAuthorsQuery'}),
  graphql(addBookMutation, { name: 'addBookMutation'}),
)(AddBook)
