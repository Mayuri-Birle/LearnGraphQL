import {
	GraphQLServer,
	PubSub
} from 'graphql-yoga';

import db from './db';
import Comment from './resolvers/Comment';
import Query from './resolvers/Query';
import Post from './resolvers/Post';
import Mutation from './resolvers/Mutation';
import User from './resolvers/User';
import Subscription from './resolvers/Subscription';
import './prisma';
//Scalar types = String, Boolean,float,int,ID

const pubsub = new PubSub();
const server = new GraphQLServer({
	typeDefs: './src/schema.graphql',
	resolvers: {
		User,
		Comment,
		Post,
		Query,
		Subscription,
		Mutation
	},
	context: {
		db,
		pubsub
	}
});

server.start(() => {
	console.log('Server started');
})