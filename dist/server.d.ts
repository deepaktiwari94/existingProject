import * as express from 'express';
export declare class Server {
    app: express.Application;
    constructor();
    setConfigurations(): void;
    connectMongodb(): void;
    configureBodyParser(): void;
    setRoutes(): void;
    error404handler(): void;
    handleErrors(): void;
}
