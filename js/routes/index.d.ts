import { Router } from "express";
export declare class RoutesHandler {
    router: Router;
    invalidPathRouter: Router;
    constructor();
    configureRoutes(): Router;
    configureInvalidRoutes(): Router;
}
