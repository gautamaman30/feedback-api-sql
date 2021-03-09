import { Request, Response } from "express";
export default class FeedbackController {
    getFeedbacks(req: Request, res: Response): Promise<void>;
    getUserFeedbacks(req: Request, res: Response): Promise<void>;
    getTechnologyFeedbacks(req: Request, res: Response): Promise<void>;
    postUserFeedback(req: Request, res: Response): Promise<void>;
    postTechnologyFeedback(req: Request, res: Response): Promise<void>;
    updateFeedback(req: Request, res: Response): Promise<void>;
    updateFeedbackStatus(req: Request, res: Response): Promise<void>;
    updateFeedbackCount(req: Request, res: Response): Promise<void>;
    deleteFeedback(req: Request, res: Response): Promise<void>;
}
