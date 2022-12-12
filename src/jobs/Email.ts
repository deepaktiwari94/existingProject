import * as JobScheduler from 'node-schedule';

export class Email {


	static runEmailJobs() {

		this.sendEmailJob();
	}

	static sendEmailJob() {

		JobScheduler.scheduleJob('send email job', '35 * * * *', () => {

			console.log('Email Job schedule');

		})


	}
}