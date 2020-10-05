const Subscription = {
    count: {
        subscribe(parent, args, {
            pubsub,
            db
        }, info) {
            let count = 0
            setInterval(() => {
                count++;
                pubsub.publish('count', {
                    count
                })
            }, 1000);
            return pubsub.asyncIterator('count');
        }
    },
    comment: {
        subscribe(parent, args, {
            pubsub,
            db
        }, info) {
            const {
                postId
            } = args;
            const post = db.posts.find((po) => po.id === postId && po.published);
            if (!post) throw new Error('Post not found')
            return pubsub.asyncIterator(`comment ${postId}`)
        }

    },
    post: {
        subscribe(parent, args, {
            pubsub,
            db
        }, info) {

            return pubsub.asyncIterator('post');
        }

    }
};

export {
    Subscription as
    default
};