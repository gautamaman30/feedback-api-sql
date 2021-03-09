/*
    this file handles all the routes for the application,
    pass the control to middlewares and controllers
*/

import {Router} from "express"
import {authMiddleware, feedbackValidator, userValidator, technologyValidator} from "../middlewares/index"
import {userController, technologyController, feedbackController} from "../controllers/index"

export class RoutesHandler{
    router: Router;
    invalidPathRouter: Router;

    constructor(){
        this.router = Router();
        this.invalidPathRouter = Router();
    }

    configureRoutes(): Router {

        //check body parameters keys convert them to lowercase
        this.router.use('/', authMiddleware.checkRequestKeys);

        //handle user login
        this.router.post('/user/login', userValidator.loginUser, userController.loginUser, authMiddleware.signToken);

        //handle json web token verification
        this.router.use('/', authMiddleware.verifyToken);

        //User routes
        this.router.route('/user')
            .get(userController.getUser)
            .post(userValidator.postUser, userController.postUser, authMiddleware.signToken)
            .delete(userValidator.deleteUser, userController.deleteUser)
            .put(userValidator.updateUser, userController.updateUser);

        //Technology routes
        this.router.route('/technology')
            .get(technologyController.getTechnology)
            .post(technologyValidator.postAndUpdateTechnology, technologyController.postTechnology)
            .delete(technologyValidator.deleteTechnology, technologyController.deleteTechnology)
            .put(technologyValidator.postAndUpdateTechnology, technologyController.updateTechnology);

        //Feedback routes
        this.router.route('/feedback')
            .get(feedbackValidator.getFeedbacks, feedbackController.getFeedbacks)
            .delete(feedbackValidator.deleteFeedback, feedbackController.deleteFeedback)
            .put(feedbackValidator.updateFeedback, feedbackController.updateFeedback);

        // change feedback status
        this.router.put('/feedback/status', feedbackValidator.updateFeedbackStatus, feedbackController.updateFeedbackStatus);

        //add user count for a feedback
        this.router.put('/feedback/count', feedbackValidator.updateFeedbackCount, feedbackController.updateFeedbackCount);

        /*
            post feedback for a user,
            get feedbacks posted by user email
            and get feedbacks for a user by email
        */
        this.router.route('/user/feedback')
            .get(feedbackValidator.getUserFeedbacks, feedbackController.getUserFeedbacks)
            .post(feedbackValidator.postUserFeedback, feedbackController.postUserFeedback);

        /*
            post feedback for a technology
            and get feedbacks for a technology by name
        */
        this.router.route('/technology/feedback')
            .get(feedbackValidator.getTechnologyrFeedbacks, feedbackController.getTechnologyrFeedbacks)
            .post(feedbackValidator.postTechnologyFeedback, feedbackController.postTechnologyFeedback);

        //handle invalid routes after /api/v1
        this.router.use('/', authMiddleware.handleInvalidRoutes);

        return this.router;
    }

    configureInvalidRoutes(): Router{
        //handles unknown routes
        this.invalidPathRouter.use('/', authMiddleware.handleInvalidRoutes);
        return this.invalidPathRouter;
    }
}
