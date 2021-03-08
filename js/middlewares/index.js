"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.technologyValidator = exports.feedbackValidator = exports.userValidator = exports.authMiddleware = void 0;
const authMiddleware_1 = require("./authMiddleware");
const feedbackValidatorMiddleware_1 = require("./feedbackValidatorMiddleware");
const technologyValidatorMiddleware_1 = require("./technologyValidatorMiddleware");
const userValidatorMiddleware_1 = require("./userValidatorMiddleware");
const authMiddleware = new authMiddleware_1.AuthMiddleware();
exports.authMiddleware = authMiddleware;
const userValidator = new userValidatorMiddleware_1.UserValidator();
exports.userValidator = userValidator;
const feedbackValidator = new feedbackValidatorMiddleware_1.FeedbackValidator();
exports.feedbackValidator = feedbackValidator;
const technologyValidator = new technologyValidatorMiddleware_1.TechnologyValidator();
exports.technologyValidator = technologyValidator;