import User from '../models/User';

import {validationResult} from 'express-validator';

import {Utils} from '../Utils/Utils';

import {NodeMailer} from '../Utils/NodeMailer';

import {getEnvironmentVariables} from '../environments/env';



import * as Jwt from 'jsonwebtoken';


export class UserController {

	static async signup (req, res, next) {

		

		

		const email = req.body.email;

		const password = req.body.password;

		const username = req.body.username;

		const verificationToken = Utils.generateVerificationToken();


		
		try {

			const hash = Utils.encryptPassword(password);

			const data =  {

			email: email,
			password: hash,
			username: username,
			verification_token: verificationToken,
			verification_token_time: Date.now()

		};


			let user = await new User(data).save();
			res.send(user);

			// await NodeMailer.sendEmail({

			// 	to: [user.email], subject: 'Email Verification', 
			// 	html: '<h1>${verificationToken}</h1>'
			// });

		} catch(e) {

			next(e);
		}

		
			
		


		
	}


	


	static async verify(req, res, next) {

		const verificationToken = req.body.verification_token;

		const email = req.user.email;


		try {

		const user = await User.findOneAndUpdate({email: email, verification_token: verificationToken},
		 {verified: true, updated_at: new Date()}, {new: true});

		if(user) {

			res.send(user);


		} else {

			throw new Error('Verification Token is Expired. Please Request for a new one');
		}


		} catch(e) {


			next(e);


		}

	}


	static async resendVerificationEmail(req, res, next) {


		const email = req.user.email;

		const verificationToken = Utils.generateVerificationToken();

		try {

			const user = await User.findOneAndUpdate({email: email}, {

				verification_token: verificationToken,
				 verification_token_time: Date.now() + new Utils().MAX_TOKEN_TIME
				});


			if(user) {

					// const mailer = NodeMailer.sendEmail({
					// 		to: [user.email],
					// 		subject: 'Email Verification',
					// 		html: '<h1>${verificationToken}</h1>'
					// 	});

					res.json({

						success: true
					});

			} else {

					throw Error('User Not Exist');
			}


		} catch(e) {


			next(e);
		}

	}

	static async login(req, res, next) {

		const password = req.query.password;

		const user = req.user;

		try {

			await Utils.comparePassword({

				plainPassword: password,
				encryptedPassword: user.password
			});


			const token = Jwt.sign({email: user.email, user_id: user._id}, getEnvironmentVariables().jwt_secret, {expiresIn: '120d'});

			const data = {token: token, user: user};

			res.json(data);


		} catch (e) {

			next(e);


		}

	}

	static async updatePassword(req, res, next) {

		const user_id = req.user.user_id;

		const password = req.body.password;

		const newPassword = req.body.new_password;

		try {

			const user: any = await User.findOne({_id: user_id});

					await Utils.comparePassword({

						plainPassword: password,
						encryptedPassword: user.password
					});


			const encryptPassword = await Utils.encryptPassword(newPassword);

			const newUser = await User.findOneAndUpdate({_id: user_id}, {password: encryptPassword}, {new: true});
			res.send(newUser);

		

		} catch (e) {

			next(e);


		}


	}


	static async sendResetPassword(req, res, next) {

		const email = req.query.email;

		const resetPasswordToken = Utils.generateVerificationToken();

		try {

			const updatedUser = await User.findOneAndUpdate({email: email}, {

				reset_password_token: resetPasswordToken,
				reset_password_token_time: Date.now() + new Utils().MAX_TOKEN_TIME,
				updated_at: new Date(),
			}, {new: true});

			res.send(updatedUser);

			await NodeMailer.sendEmail({

				to: [email],
				subject: 'Reset Password Email',
				html: '<h1> ${resetPasswordToken} </h1>'
			});


		} catch (e) {

			next(e);
		}


	}

	static verifyResetPasswordToken(req, res, next) {

		res.json({

			success: true

		});
	}


	static async resetPassword(req, res, next) {


		const user = req.user;

		const newPassword = req.body.new_password;

		try {

			const encryptedPassword = await Utils.encryptPassword(newPassword);

			const updatedUser = await User.findOneAndUpdate({_id: user._id}, {

				updated_at: new Date(),
				password: encryptedPassword
			}, {new: true});

			res.send(updatedUser);


		} catch (e) {

			next(e);
		}



	}

	static async updateProfilePic(req, res, next) {


		const userId = req.user.user_id;

		const fileUrl = 'http://localhost:3000/' + req.file.path;



		try {

			const user = await User.findOneAndUpdate({_id: userId}, 

				{updated_at: new Date(),
				profile_pic_url: fileUrl
				}, {new: true});

			res.send(user);

			


		} catch (e) {

			next(e);
		}


		
	}


	static async test(req, res, next) {

		const user = await User.find({email: 'test@gmail.com', password: '12345678'})
		.setOptions({explain: 'executionStats'});

		res.send(user);
	}







}