"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
const Bcrypt = require("bcrypt");
const Multer = require("multer");
const storageOptions = Multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
class Utils {
    constructor() {
        this.MAX_TOKEN_TIME = 6000;
        this.multer = Multer({ storage: storageOptions, fileFilter: fileFilter });
    }
    static generateVerificationToken(size = 5) {
        let digits = '0123456789';
        let otp = '';
        for (let i = 0; i < size; i++) {
            otp += digits[Math.floor(Math.random() * 10)];
        }
        return parseInt(otp);
    }
    static encryptPassword(password) {
        return new Promise((resolve, reject) => {
            Bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(hash);
                }
            });
        });
    }
    static comparePassword(password) {
        return new Promise((resolve, reject) => {
            Bcrypt.compare(password.plainPassword, password.encryptedPassword, ((err, isSame) => {
                if (err) {
                    reject(err);
                }
                else if (!isSame) {
                    reject(new Error('User and Password does not match'));
                }
                else {
                    resolve(true);
                }
            }));
        });
    }
}
exports.Utils = Utils;