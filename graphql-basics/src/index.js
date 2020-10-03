import {
	GraphQLServer
} from 'graphql-yoga';
import {
	v4 as
	uuidv4
} from 'uuid';
//Scalar types = String, Boolean,float,int,ID

//Type definition(schemas)
const users = [{
		id: "1",
		name: 'Mayuri',
		email: 'mayuri@gmail.com',
		age: 21,

	},
	{
		id: "2",
		name: 'Neil',
		email: 'Neil@gmail.com',
		age: 25,

	},
	{
		id: "3",
		name: 'shiven',
		email: 'shiven@gmail.com',
		age: 22,

	}
];

const posts = [{
		id: "1234",
		title: 'Javascript',
		body: 'Javascript mast language hai',
		published: true,
		author: '1',


	},
	{
		id: "123",
		title: 'Flutter',
		body: 'Flutter is a mobile framework',
		published: false,
		author: '3',

	},
	{
		id: "12",
		title: 'GraphQL',
		body: 'GraphQl can be used without RESt',
		published: true,
		author: '1',

	}
];
const comments = [{
		id: 'abc12',
		text: 'This is good',
		author: '2',
		post: '12'
	},
	{
		id: 'abc13',
		text: 'This is nice',
		author: '3',
		post: '123'
	},
	{
		id: 'abc14',
		text: 'This is aweosme',
		author: '1',
		post: '1234'
	},
	{
		id: 'abc15',
		text: 'This is bad',
		author: '3',
		post: '12'
	}
];

const typeDefs = `

    type Query{
				persons(query: String): [User!]!
				posts(query: String): [Post!]!
        me: User!
				post: Post!
				comments: [Comment!]!
		}
		type Mutation{
			createUser(name: String!, email: String!, age:Int): User!
			createPost(title: String!, body:String!, published: Boolean!, author: ID! ): Post!
			createComment(text: String!, author:ID!, post: ID!): Comment!
		}
    type User{
        id:ID!
        name: String!
        email:String!
				age:Int
				posts: [Post!]!
				comments: [Comment!]!
		}
    type Post{
        id: ID!
        title: String!
        body: String!
				published: Boolean!
				author: User!
				comments: [Comment!]!
		}
		type Comment{
			id: ID!
			text: String!
			author: User!
			post: Post!
		}
`;

//Resolvers
const resolvers = {
	Query: {

		persons(parent, args, ctx, info) {
			const {
				query
			} = args;
			if (!query) return users;

			return users.filter(user => user.name.toLowerCase().includes(query.toLowerCase()));
		},
		posts(parent, args, ctx, info) {
			const {
				query
			} = args;
			if (!query) return posts;
			return posts.filter(post => post.title.toLowerCase().includes(query.toLowerCase()) || post.body.toLowerCase().includes(query.toLowerCase()));
		},
		comments(parent, args, ctx, info) {
			const {
				query
			} = args;
			if (!query) return comments;
			return comments.filter(comment => comment.title.toLowerCase().includes(query.toLowerCase()) || comment.body.toLowerCase().includes(query.toLowerCase()));

		},

		me() {
			return {
				id: "1234",
				name: 'Mayuri',
				email: 'mayuri@gmail.com',
				age: '21'
			}
		},
		post() {
			return {
				id: 'abc12',
				title: 'GraphQl',
				body: 'learn graphql by neil sir',
				published: true,
				author: '2'
			}
		},
	},
	Post: {
		author(parent, args, ctx, info) {
			const {
				author
			} = parent;
			return users.find((user) => user.id === author);
		},
		comments(parent, args, ctx, info) {
			const {
				id
			} = parent;
			return comments.filter(comment => comment.post === id);
		}
	},
	User: {
		posts(parent, args, ctx, info) {
			const {
				id
			} = parent;
			return posts.filter((post) => post.author === id);

		},
		comments(parent, args, ctx, info) {
			const {
				id
			} = parent;
			return comments.filter((comment) => comment.author === id);
		}
	},
	Comment: {
		author(parent, args, ctx, info) {
			const {
				author
			} = parent;
			return users.find((user) => user.id === author);
		},
		post(parent, args, ctx, info) {
			const {
				post
			} = parent;
			return posts.find((p) => p.id === post);
		}
	},
	Mutation: {
		createUser(parent, args, ctx, nfo) {
			const {
				name,
				email,
				age
			} = args;
			const emailTaken = users.some((user) => user.email === email);
			if (emailTaken) throw Error('Email Taken');
			const newUser = {
				id: uuidv4(),
				name,
				email,
				age
			};
			users.push(newUser);
			return newUser;
		},
		createPost(parent, args, ctx, nfo) {
			const {
				title,
				body,
				published,
				author
			} = args;
			const userExists = users.some((user) => user.id === author);
			if (!userExists) throw Error('User not found');
			const newPost = {
				id: uuidv4(),
				title,
				body,
				published,
				author,
			};
			posts.push(newPost);
			return newPost;
		},
		createComment(parent, args, ctx, nfo) {
			const {
				text,
				author,
				post,
			} = args;
			const userExists = users.some((user) => user.id === author);
			if (!userExists) throw Error('User not found');
			const postExists = posts.find((po) => po.id === post);
			if (!postExists) throw Error('Post not found');
			if (!postExists.published) throw Error('Not published');
			const newComment = {
				id: uuidv4(),
				text,
				author,
				post,

			};
			comments.push(newComment);
			return newComment;
		}
	}
};

const server = new GraphQLServer({
	typeDefs,
	resolvers
});

server.start(() => {
	console.log('Server started');
})