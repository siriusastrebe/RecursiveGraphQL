var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema, GraphQLObjectType } = require('graphql');

// Using https://www.digitalocean.com/community/tutorials/a-practical-graphql-getting-started-guide-with-nodejs as a rough template
var schema = buildSchema(`
  type Query {
    hello: String
    user(id: Int!): Person
    parents(child: Int!): [Person]
  },
  type Person {
    id: Int
    name: String
    age: Int
    children: [Person]
  }
`);

// Root resolver
var root = {
  user: getUser,
  parents: getParents
};

function getUser(args) {
  var userID = args.id;
  const user =  users.filter(user => user.id == userID)[0];

  var copy = JSON.parse(JSON.stringify(user));

  if (user && copy.children && copy.children.length > 0) {
    var children = copy.children.map((id) => {
      return getUser({id: id});
    });
    copy.children = children;
  }

  return copy;
}

function getParents(args) {
  return users.filter(user => user.children.indexOf(args.id) !== -1);
}

var users = [
  {
    id: 1,
    name: 'Brian',
    age: '21',
    children: [3]
  },
  {
    id: 2,
    name: 'Kim',
    age: '22',
    children: []
  },
  {
    id: 3,
    name: 'Faith',
    age: '23',
    children: []
  },
  {
    id: 4,
    name: 'Joseph',
    age: '23',
    children: []
  },
  {
    id: 5,
    name: 'Joy',
    age: '25',
    children: []
  }
];


var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));
