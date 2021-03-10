import UserService from "./userService"
import TechnologyService from "./technologyService"
import FeedbackService from "./feedbackService"


const userService: UserService = new UserService();
const technologyService: TechnologyService = new TechnologyService();
const feedbackService: FeedbackService = new FeedbackService();


export {userService, technologyService, feedbackService};