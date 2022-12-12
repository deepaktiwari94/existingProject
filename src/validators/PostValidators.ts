import {body,query,param} from 'express-validator';

import Post from '../models/Post';

import Comment from '../models/Comment';


export class PostValidators {


	static addPost() {

		return[body('content', 'Post Content is Required').isString()];

	}

	static getPostById() {

			return [param('id').custom((id, {req}) => {

				return Post.findOne({_id: id}, {user_id: 0, __v: 0}).populate('comment').then((post) => {

					if(post) {

						req.post = post;
						return true;
					} else {

						throw new Error('Post Does Not Exist');
					}

			})
			})]

	}

	static editPost() {

		return[body('content', 'Post Content is Required').isString()];

	}

	static deletePost() {

		return [param('id').custom((id, {req}) => {

				return Post.findOne({_id: id}, {user_id: 0, __v: 0}).then((post) => {

					if(post) {

						req.post = post;
						return true;
					} else {

						throw new Error('Post Does Not Exist');
					}

			})
			})]

	}


}