import * as express from 'express';

import * as mongoose from 'mongoose';
import {getEnvironmentVariables} from './environments/env';

import UserRouter from './routers/UserRouter';

import PostRouter from './routers/PostRouter';

import CommentRouter from './routers/CommentRouter';

import * as bodyParser from 'body-parser';

import {Jobs} from './jobs/Jobs';



export class Server {

	public app: express.Application = express();

	constructor() {


		this.setConfigurations();
		this.setRoutes();
		this.error404handler();
		this.handleErrors();
	}

	setConfigurations () {

		this.connectMongodb();
		this.configureBodyParser();
		Jobs.runRequiredJobs();
		


	}

	connectMongodb () {

		

mongoose .connect(getEnvironmentVariables().db_url) .then(() => console.log("MongoDB connected")) .catch((err) => console.log(err));


	}


configureBodyParser() {

		this.app.use(bodyParser.urlencoded({extended: true}));
	}

	setRoutes () {

		this.app.use('/src/uploads', express.static('src/uploads'));

		this.app.use('/api/user', UserRouter);

		this.app.use('/api/post', PostRouter);

		this.app.use('/api/comment', CommentRouter);


	}

	error404handler() {

		this.app.use((req,res) => {

			res.status(404).json({

				message: 'Not Found',
				status_code: 404
			});


		});
	}

	handleErrors () {

		this.app.use((error, req, res, next) => {

			const errorStatus = req.errorStatus || 500;

			res.status(errorStatus).json({

				message: error.message || 'something went wrong',
				status_code: errorStatus
			})

		})
	}
}


