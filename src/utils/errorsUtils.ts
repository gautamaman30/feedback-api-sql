/*
    this file export Errors messages
*/

export const Errors = {
    ADMIN_POST_USERS: "Only admins can add new users",
    ADMIN_POST_FEEDBACK : "Admin cannot give feedbacks",
    ADMIN_EDIT_FEEDBACK : "Only users can edit their feedback",
    ADMIN_DELETE_ADMIN : "Admin cannot delete another admin",
    ADMIN_NOT_FOUND : "Admin not found",
    NOT_ADMIN: "User is not authorized as admin",
    ADMIN_EDIT_USER: "Admin cannot edit user details",
    ADMIN_CONSUME_FOOD: "Admin cannot consume food items",

    USER_NAME_REQUIRED : "User name is required",
    USER_ID_REQUIRED : "User id is required",
    USER_PASSWORD_INCORRECT: "Incorrect password",
    DUPLICATE_EMAIL : "User with this email already exists",
    USER_NOT_FOUND : "User not found",
    USER_UPDATE_FIELD_REQUIRED: "User update fields cannot be empty",

    USER_POST_FOODITEM : "User cannot create food items",
    USER_EDIT_FOODITEM: "User cannot update food items",
    USER_DELETE_FOODITEM: "User cannot delete food items",

    USER_POST_OWN_FEEDBACK : "User cannot post feedbacks about themselves",
    USER_EDIT_OTHERS_FEEDBACK : "User cannot update other user's feedbacks",

    TECHNOLOGY_NAME_REQUIRED : "Technology name is required",
    TECHNOLOGY_DETAILS_REQUIRED : "Technology details is required",
    TECHNOLOGY_NOT_FOUND : "Technology not found",
    DUPLICATE_TECHNOLOGY : "Technology with this name already exists",

    FEEDBACK_NAME_REQUIRED: "Feedback name is required",
    FEEDBACK_ID_REQUIRED : "Feedback id is required",
    FEEDBACK_REQUIRED: "Feedback is required",
    FEEDBACK_STATUS_REQUIRED : "Feedback status is required",
    FEEDBACK_STATUS_INCORRECT : "Feedback status can be 'approved' or 'rejected' only",
    FEEDBACK_EMPTY: "Feedback cannot be empty",
    FEEDBACK_NOT_FOUND : "Feedback not found",
    FEEDBACK_USER_COUNT_EXIST : "Count with this name already exists",

    DUPLICATE_FOODITEM : "Food item with this name already exists",
    FOODITEM_NOT_FOUND: "Food item not found",
    FOODITEM_UPDATE_FIELD_REQUIRED: "Food item update fields cannot be empty",
    FOODITEM_QUANTITY_NOT_AVAILABLE: "This much quantity quantity for the food item is not available",

    NAME_NOT_FOUND: "Name not found",
    DATE_FORMAT_INCORRECT: "Only accepted date format is 'YYYY-MM-DD'",
    INTERNAL_ERROR : "Internal error",
    BAD_REQUEST: "Bad request",
    INVALID_DATE: "Invalid date",
    AUTHORIZATION_FAILED : "Authorization failed",
    DATABASE_CONNECTION_FAILED: "Database connection failed, retry",
    URL_NOT_FOUND: "Invalid path, url not found"
 }
