import FeedbackController from "./feedbackController"
import UserController from "./userController"
import TechnologyController from "./technologyController"
import FoodItemController from "./foodItemController"

const userController = new UserController();
const technologyController = new TechnologyController();
const feedbackController = new FeedbackController();
const foodItemController = new FoodItemController();

export { userController, feedbackController, technologyController, foodItemController};
