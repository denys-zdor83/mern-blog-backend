import { body } from "express-validator";

export const registerValidation = [
    body("fullName")
        .isLength({ min: 3 })
        .withMessage("Name must be at least 3 characters long"),
    body("email")
        .isEmail()
        .withMessage("Must be a valid email address"),
    body("password")
        .isLength({ min: 5 })
        .withMessage("Password must be at least 5 characters long"),
    body("avatarUrl")
        .optional()
        .isURL()
        .withMessage("Must be a valid url"),
];

export const loginValidation = [
    body("email")
        .isEmail()
        .withMessage("Must be a valid email address"),
    body("password")
        .isLength({ min: 5 })
        .withMessage("Password must be at least 5 characters long"),
];

export const postCreateValidation = [
    body("title")
        .isLength({ min: 3 })
        .isString()
        .withMessage("Enter a valid title"),
    body("text")
        .isLength({ min: 10 })
        .isString()
        .withMessage("Enter a valid article text"),
    body("tags")
        .optional()
        .isString()
        .withMessage("Wrong format of tags"),
    body("imageUrl")
        .optional()
        .isString()
        .withMessage("Must be a valid url"),
];