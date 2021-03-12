import UserService from "./userService"
import TechnologyService from "./technologyService"
import FeedbackService from "./feedbackService"
import FoodItemService from "./foodItemService"


const userService: UserService = new UserService();
const technologyService: TechnologyService = new TechnologyService();
const feedbackService: FeedbackService = new FeedbackService();
const foodItemService: FoodItemService = new FoodItemService();

export {userService, technologyService, feedbackService, foodItemService};
