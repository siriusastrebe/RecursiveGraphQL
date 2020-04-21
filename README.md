# Usage:

```node app.js```

Open up http://localhost:4000/graphql. Query the users:

```
{
    user(id:1) {
        id
        name
        age
        children {
          id
          name
          age
          children {
            id
            name
            age
          }
        }
    }
}
```

You should get a recursive listing matching this structure:

```
{
  "data": {
    "user": {
      "id": 1,
      "name": "Brian",
      "age": 21,
      "children": [
        {
          "id": 3,
          "name": "Faith",
          "age": 23,
          "children": []
        }
      ]
    }
  }
}
```
