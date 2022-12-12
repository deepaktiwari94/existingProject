"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidators = void 0;
const express_validator_1 = require("express-validator");
const User_1 = require("../models/User");
class UserValidators {
    static signup() {
        return [(0, express_validator_1.body)('email', 'Email is Required').isEmail().custom((email, { req }) => {
                return User_1.default.findOne({ email: email }).then(user => {
                    if (user) {
                        throw new Error('User Already Exist');
                    }
                    else {
                        return true;
                    }
                });
            }),
            (0, express_validator_1.body)('password', 'Password is Required').isAlphanumeric()
                .isLength({ min: 8, max: 20 }).withMessage('Password Must be 8-20 characters'),
            (0, express_validator_1.body)('username', 'Username is Required').isString()
        ];
    }
    static verifyUser() {
        return [(0, express_validator_1.body)('verification_token', 'Verification Token is Required').isNumeric()];
    }
    static updatePassword() {
        return [(0, express_validator_1.body)('password', 'Password is Required').isAlphanumeric(),
            (0, express_validator_1.body)('confirm_password', 'Confirm Password is Required').isAlphanumeric(),
            (0, express_validator_1.body)('new_password', 'New Password is Required').isAlphanumeric().
                custom((newPassword, { req }) => {
                if (newPassword === req.body.confirm_password) {
                    return true;
                }
                else {
                    req.errorStatus = 422;
                    throw new Error('Password does not match');
                }
            })];
    }
    static login() {
        return [(0, express_validator_1.query)('email', 'Email is Required').isEmail().custom((email, { req }) => {
                return User_1.default.findOne({ email: email }).then(user => {
                    if (user) {
                        req.user = user;
                        return true;
                    }
                    else {
                        throw new Error('User does not Exist');
                    }
                });
            }),
            (0, express_validator_1.query)('password', 'Password is Required').isAlphanumeric()];
    }
    static sendResetPassword() {
        return [(0, express_validator_1.query)('email').isEmail().custom((email, { req }) => {
                return User_1.default.findOne({ email: email }).then((user) => {
                    if (user) {
                        return true;
                    }
                    else {
                        throw new Error('Email Does Not Exist');
                    }
                });
            })];
    }
    static verifyResetPasswordToken() {
        return [(0, express_validator_1.query)('reset_password_token', 'Reset Password Token is Required')
                .isNumeric().custom((token, { req }) => {
                return User_1.default.findOne({ reset_password_token: token }).then((user) => {
                    if (user) {
                        return true;
                    }
                    else {
                        throw new Error('Token does not exist. Please Request for a new one');
                    }
                });
            })];
    }
    static resetPassword() {
        return [(0, express_validator_1.body)('email', 'Email is Required').isEmail().custom((email, { req }) => {
                return User_1.default.findOne({ email: email }).then(user => {
                    if (user) {
                        req.user = user;
                        return true;
                    }
                    else {
                        throw new Error('User does not Exist');
                    }
                });
            }),
            (0, express_validator_1.body)('new_password', 'New Password is Required').isAlphanumeric(),
            (0, express_validator_1.body)('confirm_password', 'confirm Password is Required').isAlphanumeric()
                .custom((newPassword, { req }) => {
                if (newPassword === req.body.confirm_password) {
                    return true;
                }
                else {
                    throw new Error('confirm Password and new password does not match');
                }
            }),
            (0, express_validator_1.body)('reset_password_token', 'Token is Required').isNumeric().custom((token, { req }) => {
                if (Number(req.user.reset_password_token) === Number(token)) {
                    return true;
                }
                else {
                    req.errorStatus = 422;
                    throw new Error('Reset Password token is invalid. Plz try again');
                }
            })];
    }
    static updateProfilePic() {
        return [(0, express_validator_1.body)('profile_pic').custom((profilePic, { req }) => {
                console.log(req.file);
                if (req.file) {
                    return true;
                }
                else {
                    throw new Error('File Not Uplode');
                }
            })];
    }
}
exports.UserValidators = UserValidators;
