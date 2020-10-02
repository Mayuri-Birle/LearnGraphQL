import {
    GraphQLServer
} from 'graphql-yoga';

//Scalar types = String, Boolean,float,int,ID

//Type definition(schemas)

const users = [{
        id: "1234",
        name: 'Mayuri',
        email: 'mayuri@gmail.com',
        age: 21
    },
    {
        id: "123",
        name: 'Neil',
        email: 'Neil@gmail.com',
        age: 25
    },
    {
        id: "1123234",
        name: 'Shiven',
        email: 'Shiven@gmail.com',
        age: 21
    }
]

const typeDefs = `

    type Query{
        persons(query: String): [User!]!
        greeting(name: String): String!
        add(numbers: [Float!]!): Float!
        me: User!
        post: Post!
    }
    type User{
        id:ID!
        name: String!
        email:String!
        age:Int!
    }
    type Post{
        id: ID!
        title: String!
        body: String!
        published: Boolean!
    }
`;

//Resolvers
const resolvers = {
    Query: {
        greeting(parent, args, ctx, info) {
            if (args.name) {
                return `Hello ${args.name}`;
            }
            return 'Hello';

        },
        persons(parent, args, ctx, info) {
            const {
                query
            } = args;
            if (!query) return users;

            return users.filter(user => user.name.toLowerCase().includes(query.toLowerCase()));
        },
        add(parent, args, ctx, info) {
            const {
                numbers: n
            } = args;
            return (n.reduce((a, b) => a + b, 0));


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
                published: true
            }
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