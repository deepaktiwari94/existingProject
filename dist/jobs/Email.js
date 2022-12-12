"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Email = void 0;
const JobScheduler = require("node-schedule");
class Email {
    static runEmailJobs() {
        this.sendEmailJob();
    }
    static sendEmailJob() {
        JobScheduler.scheduleJob('send email job', '35 * * * *', () => {
            console.log('Email Job schedule');
        });
    }
}
exports.Email = Email;
