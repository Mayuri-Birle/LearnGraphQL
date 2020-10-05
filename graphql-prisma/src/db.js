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

const db = {
    users,
    posts,
    comments
}

export {
    db as
    default
}