import express from "express"
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js"
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/user.js";

const router = express.Router()

router.put("/:id", updateUser);

//DELETE
router.delete("/:id",  deleteUser);

//GET
router.get("/:id",  getUser);

//GET ALL
router.get("/",  getUsers);

export default router