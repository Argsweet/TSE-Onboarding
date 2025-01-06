import { body } from "express-validator";

const makeNameValidator = () =>
  body("name")
    .exists()
    .withMessage("Name is required")
    .bail()
    .isString()
    .withMessage("Name must be a string")
    .bail()
    .notEmpty()
    .withMessage("Name cannot be empty");

const makeProfilePictureURLValidator = () =>
  body("profilePictureURL")
    .optional()
    .isURL()
    .withMessage("Profile Picture URL must be a valid URL");

export const createUser = [makeNameValidator(), makeProfilePictureURLValidator()];
