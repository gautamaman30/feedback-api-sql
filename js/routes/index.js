"use strict";
/*
    this file handles all the routes for the application,
    pass the control to middlewares and controllers
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutesHandler = void 0;
const express_1 = require("express");
const index_1 = require("../middlewares/index");
const index_2 = require("../controllers/index");
class RoutesHandler {
    constructor() {
        this.router = express_1.Router();
        this.invalidPathRouter = express_1.Router();
    }
    configureRoutes() {
        //check body parameters keys convert them to lowercase
        this.router.use('/', index_1.authMiddleware.checkRequestKeys);
        //handle user login
        this.router.post('/user/login', index_1.userValidator.loginUser, index_2.userController.loginUser, index_1.authMiddleware.signToken);
        //handle json web token verification
        this.router.use('/', index_1.authMiddleware.verifyToken);
        //User routes
        this.router.route('/user')
            .get(index_2.userController.getUser)
            .post(index_1.userValidator.postUser, index_2.userController.postUser, index_1.authMiddleware.signToken)
            .delete(index_1.userValidator.deleteUser, index_2.userController.deleteUser)
            .put(index_1.userValidator.updateUser, index_2.userController.updateUser);
        //Technology routes
        this.router.route('/technology')
            .get(index_2.technologyController.getTechnology)
            .post(index_1.technologyValidator.postAndUpdateTechnology, index_2.technologyController.postTechnology)
            .delete(index_1.technologyValidator.deleteTechnology, index_2.technologyController.deleteTechnology)
            .put(index_1.technologyValidator.postAndUpdateTechnology, index_2.technologyController.updateTechnology);
        //Feedback routes
        this.router.route('/feedback')
            .get(index_1.feedbackValidator.getFeedbacks, index_2.feedbackController.getFeedbacks)
            .delete(index_1.feedbackValidator.deleteFeedback, index_2.feedbackController.deleteFeedback)
            .put(index_1.feedbackValidator.updateFeedback, index_2.feedbackController.updateFeedback);
        // change feedback status
        this.router.put('/feedback/status', index_1.feedbackValidator.updateFeedbackStatus, index_2.feedbackController.updateFeedbackStatus);
        //add user count for a feedback
        this.router.put('/feedback/count', index_1.feedbackValidator.updateFeedbackCount, index_2.feedbackController.updateFeedbackCount);
        /*
            post feedback for a user,
            get feedbacks posted by user email
            and get feedbacks for a user by email
        */
        this.router.route('/user/feedback')
            .get(index_1.feedbackValidator.getUserFeedbacks, index_2.feedbackController.getUserFeedbacks)
            .post(index_1.feedbackValidator.postUserFeedback, index_2.feedbackController.postUserFeedback);
        /*
            post feedback for a technology
            and get feedbacks for a technology by name
        */
        this.router.route('/technology/feedback')
            .get(index_1.feedbackValidator.getTechnologyFeedbacks, index_2.feedbackController.getTechnologyFeedbacks)
            .post(index_1.feedbackValidator.postTechnologyFeedback, index_2.feedbackController.postTechnologyFeedback);
        //food items routes
        this.router.route('/fooditem')
            .get(index_1.foodItemValidator.getFoodItems, index_2.foodItemController.getFoodItems)
            .post(index_1.foodItemValidator.postFoodItem, index_2.foodItemController.postFoodItem)
            .delete(index_1.foodItemValidator.deleteFoodItem, index_2.foodItemController.deleteFoodItem)
            .put(index_1.foodItemValidator.updateFoodItem, index_2.foodItemController.updateFoodItem);
        /*
            user account routes for food consumption
        */
        this.router.route('/user/consume/fooditem')
            .get(index_1.userValidator.getUserFoodItems, index_2.userController.getUserFoodItems)
            .post(index_1.userValidator.postUserFoodItems, index_2.userController.postUserFoodItems)
            .delete(index_1.userValidator.deleteUserFoodItems, index_2.userController.deleteUserFoodItems);
        this.router.get('/user/consume/fooditem/due', index_1.userValidator.getUserTotalAmountDue, index_2.userController.getUserTotalAmountDue);
        //handle invalid routes after /api/v1
        this.router.use('/', index_1.authMiddleware.handleInvalidRoutes);
        return this.router;
    }
    configureInvalidRoutes() {
        //handles unknown routes
        this.invalidPathRouter.use('/', index_1.authMiddleware.handleInvalidRoutes);
        return this.invalidPathRouter;
    }
}
exports.RoutesHandler = RoutesHandler;
