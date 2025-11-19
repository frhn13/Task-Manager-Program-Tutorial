import express from "express"
import { getAllTasks, getTask, createTask, deleteTask, updateTask } from "../contollers/tasks.js"
const router = express.Router()

router.route("/").get(getAllTasks).post(createTask)
router.route("/:id").get(getTask).patch(updateTask).delete(deleteTask)


export default router