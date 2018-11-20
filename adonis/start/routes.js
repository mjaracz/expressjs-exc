
/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

'use strict'


const Route = use('Route')


const GraphqlAdonis = use('ApolloServer')
const schema = require('../app/data/schema');

Route.get('/', ({ request }) => {
  return { greeting: 'Hello world in JSON'}
})

Route.route('/graphql', ({ request, auth, respons }) => {
  return GraphqlAdonis.graphql({
    schema,
    context: { auth }
  }, request, respons )
}, ['GET', 'POST'])

Route.get('/graphiql', ({ request, response }) => {
  return GraphqlAdonis.graphql({ endpointURL: '/graphql' }, request, response)
})