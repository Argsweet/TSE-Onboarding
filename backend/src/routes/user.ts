import express from "express";
import * as UserController from "src/controllers/user";
import * as UserValidator from "src/validators/user";
import { getUser } from "src/controllers/user";

const router = express.Router();

router.post("/", UserValidator.createUser, UserController.createUser);
router.get("/:id", getUser);

export default router;
