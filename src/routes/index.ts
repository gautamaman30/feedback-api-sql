import {Router} from "express"
import {authMiddleware, feedbackValidator, userValidator, technologyValidator} from "../middlewares/index"
import {userController, technologyController, feedbackController} from "../controllers/index"


export class RoutesHandler{
    router: Router;

    constructor(){
        this.router = Router();
    }


    configureRoutes(): Router {

        this.router.use('/', authMiddleware.checkRequestKeys);

        this.router.post('/user/login', userValidator.loginUser, userController.loginUser, authMiddleware.signToken);

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

        //post feedback for a user
        this.router.route('/user/feedback')
            .post(feedbackValidator.postUserFeedback, feedbackController.postUserFeedback);

        //post feedback for a technology
        this.router.route('/technology/feedback')
            .post(feedbackValidator.postTechnologyFeedback, feedbackController.postTechnologyFeedback);


        return this.router;
    }
}
