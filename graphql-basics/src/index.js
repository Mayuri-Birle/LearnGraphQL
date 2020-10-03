import {
	GraphQLServer
} from 'graphql-yoga';

import db from './db';
import Comment from './resolvers/Comment';
import Query from './resolvers/Query';
import Post from './resolvers/Post';
import Mutation from './resolvers/Mutation';
import User from './resolvers/User';

//Scalar types = String, Boolean,float,int,ID


const server = new GraphQLServer({
	typeDefs: './src/schema.graphql',
	resolvers: {
		User,
		Comment,
		Post,
		Query,
		Mutation
	},
	context: {
		db
	}
});

server.start(() => {
	console.log('Server started');
})