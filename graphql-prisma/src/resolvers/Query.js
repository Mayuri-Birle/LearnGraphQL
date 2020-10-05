const Query = {

    persons(parent, args, {
        db
    }, info) {
        const {
            query
        } = args;
        if (!query) return db.users;

        return db.users.filter(user => user.name.toLowerCase().includes(query.toLowerCase()));
    },
    posts(parent, args, {
        db
    }, info) {
        const {
            query
        } = args;
        if (!query) return db.posts;
        return db.posts.filter(post => post.title.toLowerCase().includes(query.toLowerCase()) || post.body.toLowerCase().includes(query.toLowerCase()));
    },
    comments(parent, args, {
        db
    }, info) {
        const {
            query
        } = args;
        if (!query) return db.comments;
        return db.comments.filter(comment => comment.title.toLowerCase().includes(query.toLowerCase()) || comment.body.toLowerCase().includes(query.toLowerCase()));

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
};

export {
    Query as
    default
};