import { AuthMiddleware } from "./authMiddleware"
import { FeedbackValidator } from "./feedbackValidatorMiddleware"
import { TechnologyValidator } from "./technologyValidatorMiddleware"
import { UserValidator } from "./userValidatorMiddleware"
import { FoodItemValidator } from "./foodItemValidator"

const authMiddleware = new AuthMiddleware();
const userValidator = new UserValidator();
const feedbackValidator = new FeedbackValidator();
const technologyValidator = new TechnologyValidator();
const foodItemValidator = new FoodItemValidator();

export { authMiddleware, userValidator, feedbackValidator, technologyValidator, foodItemValidator };
