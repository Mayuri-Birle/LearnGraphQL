import {
	v4 as
	uuidv4
} from 'uuid';
const Mutation = {
	createUser(parent, args, {
		db
	}, nfo) {
		const {
			data,
		} = args;
		const {
			email
		} = data;
		const emailTaken = db.users.some((user) => user.email === email);
		if (emailTaken) throw Error('Email Taken');
		const newUser = {
			id: uuidv4(),
			...data
		};
		db.users.push(newUser);
		return newUser;
	},
	createPost(parent, args, {
		db
	}, nfo) {
		const {
			data,
		} = args;
		const {
			author
		} = data;;
		const userExists = db.users.some((user) => user.id === author);
		if (!userExists) throw Error('User not found');
		const newPost = {
			id: uuidv4(),
			...data
		};
		db.posts.push(newPost);
		return newPost;
	},
	createComment(parent, args, {
		db
	}, info) {
		const {
			data,
		} = args;
		const {
			author,
			post
		} = data;
		const userExists = db.users.some((user) => user.id === author);
		if (!userExists) throw Error('User not found');
		const postExists = db.posts.find((po) => po.id === post);
		if (!postExists) throw Error('Post not found');
		if (!postExists.published) throw Error('Not published');
		const newComment = {
			id: uuidv4(),
			...data
		};
		db.comments.push(newComment);
		return newComment;
	},
	deleteUser(parent, args, {
		db
	}, info) {
		const {
			id
		} = args;
		const userIdx = db.users.findIndex((user) => user.id === id);
		if (userIdx < 0) throw Error('User not found');
		const deletedUser = db.users.splice(userIdx, 1);
		db.posts = db.posts.filter((post) => {
			const match = post.author === id;
			if (match) {
				db.comments = db.comments.filter((comment) => {
					comment.post !== post.id;

				})
			}
			return !match;
		});
		db.comments = db.comments.filter((comment) => comment.author !== id);
		return deletedUser[0];
	},
	deletePost(parent, args, {
		db
	}, info) {
		const {
			id
		} = args;
		const postIdx = db.posts.findIndex((po) => po.id === id);
		if (postIdx < 0) throw Error('Post not found');
		const deletedPost = db.posts.splice(postIdx, 1);
		db.comments = db.comments.filter((comment) => comment.author !== id);
		return deletedPost[0];
	},
	deleteComment(parent, args, {
		db
	}, info) {
		const {
			id
		} = args;
		const commentIDx = db.comments.findIndex((c) => c.id === id);
		if (commentIDx < 0) throw Error('Comment not found');
		const deletedComment = db.comments.splice(commentIDx, 1);
		return deletedComment[0];
	},
	updateUser(parent, args, {
		db
	}, info) {
		const {
			id,
			data
		} = args;
		const {
			name,
			email,
			age
		} = data;
		const user = db.users.find((user) => user.id === id);
		if (!user) throw Error('User not found');
		if (typeof email === 'string') {
			const emailTaken = db.users.some(user => user.email === email);
			if (emailTaken) throw new Error('Email already taken');
			user.email = email;
		}
		if (typeof name === 'string') {
			user.name = name;
		}
		if (typeof age !== 'undefined') {
			user.age = age;
		}
		return user;
	},
	updatePost(parent, args, {
		db
	}, info) {
		const {
			id,
			data
		} = args;
		const {
			title,
			body,
			published
		} = data;
		const post = db.posts.find((po) => po.id === id);
		if (!post) throw Error('Post not found');
		if (typeof title === 'string') {
			post.title = title;
		}
		if (typeof body === 'string') {
			post.body = body;
		}
		if (typeof published === 'boolean') {
			post.published = published;
		}
		return post;
	},
	updateComment(parent, args, {
		db
	}, info) {
		const {
			id,
			data
		} = args;
		const {
			text
		} = data;
		const comment = db.comments.find((c) => c.id === id);
		if (!comment) throw Error('comment not found');
		if (typeof text === 'string') {
			comment.text = text;
		}
		return comment;
	}
};

export {
	Mutation as
	default
};