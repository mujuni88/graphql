const express     = require('express')
const graphqlHTTP = require('express-graphql')
const schema      = require('./schema/schema.js')
const mongoose    = require('mongoose')
const cors        = require('cors')

const app         = express();

// allow cross origin request
app.use(cors())

// connect to mlab database
mongoose.connect('mongodb://joe:test123@ds255740.mlab.com:55740/graphql-api')
mongoose.connection.once('open', () => {
  console.log('connected to the database')
})

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))

app.listen(4000, () => {
  console.log('now listening for requests on port 4000');
});
