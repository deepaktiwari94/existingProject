"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostValidators = void 0;
const express_validator_1 = require("express-validator");
const Post_1 = require("../models/Post");
class PostValidators {
    static addPost() {
        return [(0, express_validator_1.body)('content', 'Post Content is Required').isString()];
    }
    static getPostById() {
        return [(0, express_validator_1.param)('id').custom((id, { req }) => {
                return Post_1.default.findOne({ _id: id }, { user_id: 0, __v: 0 }).populate('comment').then((post) => {
                    if (post) {
                        req.post = post;
                        return true;
                    }
                    else {
                        throw new Error('Post Does Not Exist');
                    }
                });
            })];
    }
    static editPost() {
        return [(0, express_validator_1.body)('content', 'Post Content is Required').isString()];
    }
    static deletePost() {
        return [(0, express_validator_1.param)('id').custom((id, { req }) => {
                return Post_1.default.findOne({ _id: id }, { user_id: 0, __v: 0 }).then((post) => {
                    if (post) {
                        req.post = post;
                        return true;
                    }
                    else {
                        throw new Error('Post Does Not Exist');
                    }
                });
            })];
    }
}
exports.PostValidators = PostValidators;
