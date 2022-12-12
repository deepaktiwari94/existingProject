
import {Router} from 'express';

import {UserController} from '../controllers/UserController';

import {Utils} from '../Utils/Utils';

import {UserValidators} from '../validators/UserValidators';

import {GlobalMiddleWare} from '../middlewares/GlobalMiddleWare';


class UserRouter {

	public router: Router;

	constructor () {

		this.router = Router();

		this.getRoutes();

		this.postRoutes();

		this.patchRoutes();

		this.deleteRoutes();
	}

	getRoutes() {

		this.router.get('/send/verification/email',GlobalMiddleWare.authenticate, UserController.resendVerificationEmail);

		this.router.get('/login', UserValidators.login(), GlobalMiddleWare.checkError, UserController.login);
		this.router.get('/reset/password', UserValidators.sendResetPassword(), GlobalMiddleWare.checkError, UserController.sendResetPassword);

		this.router.get('/verify/resetPasswordToken', UserValidators.verifyResetPasswordToken(), GlobalMiddleWare.checkError, UserController.verifyResetPasswordToken);
		this.router.get('/test', UserController.test);
	}

	postRoutes() {

		this.router.post('/signup', UserValidators.signup(), GlobalMiddleWare.checkError, UserController.signup);


	}

	patchRoutes() {

			this.router.patch('/verify', GlobalMiddleWare.authenticate, UserValidators.verifyUser(), GlobalMiddleWare.checkError, UserController.verify);
			this.router.patch('/update/password', GlobalMiddleWare.authenticate, UserValidators.updatePassword(), GlobalMiddleWare.checkError, UserController.updatePassword);
			this.router.patch('/reset/password', UserValidators.resetPassword(), GlobalMiddleWare.checkError, UserController.resetPassword);
			this.router.patch('/update/profilePic', GlobalMiddleWare.authenticate, new Utils().multer.single('profile_pic'), UserValidators.updateProfilePic(), GlobalMiddleWare.checkError, UserController.updateProfilePic);
		}
	deleteRoutes() {


	}


}


export default new UserRouter().router;