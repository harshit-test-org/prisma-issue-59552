const { ApolloServer } = require('apollo-server');
const { PrismaClient } = require('@prisma/client');
const { makeSchema } = require('nexus');
const prisma = new PrismaClient({ log: ['query', `warn`, `error`] });
const { join } = require('path');
const types = require('./graphql/schema');

const schema = makeSchema({
	types,
	plugins: [],
	outputs: {
		schema: join(__dirname, './schema.graphql'),
		typegen: join(__dirname, '/generated/nexus.ts'), //TODO is ths the right path
	},
});

const server = new ApolloServer({
	schema: schema,
	context: ({ req }) => {
		return {
			...req,
			prisma,
		};
	},
});

server.listen().then(({ url }) => {
	console.log(`🚀 Server ready at ${url}`);
});
