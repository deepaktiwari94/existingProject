"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentValidators = void 0;
const express_validator_1 = require("express-validator");
const Post_1 = require("../models/Post");
const Comment_1 = require("../models/Comment");
class CommentValidators {
    static addComment() {
        return [(0, express_validator_1.body)('content', 'Comment is Required').isString(),
            (0, express_validator_1.param)('id').custom((id, { req }) => {
                return Post_1.default.findOne({ _id: id }).then((post) => {
                    if (post) {
                        req.post = post;
                        return true;
                    }
                    else {
                        throw new Error('Post does not Exist');
                    }
                });
            })];
    }
    static editComment() {
        return [(0, express_validator_1.body)('content', 'Comment is Required').isString()];
    }
    static deleteComment() {
        return [(0, express_validator_1.param)('id').custom((id, { req }) => {
                return Comment_1.default.findOne({ _id: id }).then((comment) => {
                    if (comment) {
                        req.comment = comment;
                        return true;
                    }
                    else {
                        throw new Error('Comment Does Not Exist');
                    }
                });
            })];
    }
}
exports.CommentValidators = CommentValidators;
