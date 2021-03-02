# Setup

Run

```
npm install

npx prisma db push --preview-feature

npx prisma db seed --preview-feature

npm run server

```

Then use the following query and note that it's not finding any child objects (despite query returning them)

```graphql
query example {
    parents {
        id
      	child { 
          	id
        }
    }
}
```

Then in the schema, change Decimal to Int and run

```
npx prisma db push --preview-feature

npx prisma db seed --preview-feature

npm run server
```

Then re test with the same query from above and it works 

