import * as mongoose from 'mongoose';
declare const _default: mongoose.Model<{
    email: string;
    password: string;
    profile_pic_url: string;
    verified: boolean;
    verification_token: number;
    verification_token_time: Date;
    username: string;
    created_at: Date;
    updated_at: Date;
    reset_password_token?: number;
    reset_password_token_time?: Date;
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    email: string;
    password: string;
    profile_pic_url: string;
    verified: boolean;
    verification_token: number;
    verification_token_time: Date;
    username: string;
    created_at: Date;
    updated_at: Date;
    reset_password_token?: number;
    reset_password_token_time?: Date;
}>>;
export default _default;
