import {body,query} from 'express-validator';

import User from '../models/User';


export class UserValidators {

	static signup() {

		return [body('email', 'Email is Required').isEmail().custom((email, {req}) => {

			return User.findOne({email: email}).then( user => {

				if(user) {

						throw new Error('User Already Exist');

				} else {

					return true;
				}
			})
		}),
				body('password','Password is Required').isAlphanumeric()
				.isLength({min: 8, max: 20}).withMessage('Password Must be 8-20 characters'),

				body('username', 'Username is Required').isString()

			];
	}


	static verifyUser() {

		return [body('verification_token', 'Verification Token is Required').isNumeric()];

				
	}

	static updatePassword() {

		return [body('password', 'Password is Required').isAlphanumeric(),
			body('confirm_password', 'Confirm Password is Required').isAlphanumeric(),
			body('new_password', 'New Password is Required').isAlphanumeric().
			custom((newPassword, {req}) => {

				if(newPassword === req.body.confirm_password) {

					return true;
				} else {

					req.errorStatus = 422;

					throw new Error('Password does not match');
				}
			})];
	}


	static login() {

		return [query('email', 'Email is Required').isEmail().custom((email, {req}) => {

			return User.findOne({email: email}).then( user => {

				if(user) {


					req.user = user;

					return true;

						

				} else {

					throw new Error('User does not Exist');
				}
			})
		}),

		query('password','Password is Required').isAlphanumeric()];


	}

	static sendResetPassword() {

		return [query('email').isEmail().custom((email, {req}) => {

			return User.findOne({email: email}).then((user) => {

				if(user) {
					return true;
				} else {

					throw new Error('Email Does Not Exist');
				}
			})
		})];
	}


	static verifyResetPasswordToken() {




		return [query('reset_password_token', 'Reset Password Token is Required')
			.isNumeric().custom((token, {req}) => {
				return User.findOne({reset_password_token: token}
				).then((user) => {

					if(user) {

						return true;
					} else {

						throw new Error('Token does not exist. Please Request for a new one');
					}
				})
			})];


	}


	static resetPassword() {


		return [body('email', 'Email is Required').isEmail().custom((email, {req}) => {

			return User.findOne({email: email}).then(user => {

				if(user) {


					req.user = user;

					return true;

						

				} else {

					throw new Error('User does not Exist');
				}
			});
		}),

		body('new_password','New Password is Required').isAlphanumeric(), 
		body('confirm_password','confirm Password is Required').isAlphanumeric()
		.custom((newPassword, {req}) => {

			if(newPassword === req.body.confirm_password) {

				return true;
			} else {

				throw new Error('confirm Password and new password does not match');
			}
		}),

		body('reset_password_token','Token is Required').isNumeric().custom((token, {req}) => {

				if(Number(req.user.reset_password_token) === Number(token)) {

					return true;
				} else {

					req.errorStatus = 422;
					throw new Error('Reset Password token is invalid. Plz try again');
				}

		}

		)];


	}

	static updateProfilePic() {

		return[body('profile_pic').custom((profilePic, {req}) => {

			console.log(req.file);

			if(req.file) {

				return true;
			} else {

				throw new Error('File Not Uplode');
			}
		})];



	}


}