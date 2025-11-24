import Task from "../models/tasks.js"
import asyncWrapper from "../middleware/async.js"
import {createCustomError} from "../errors/custom-error.js"
import mongoose from "mongoose"

const getAllTasks = asyncWrapper(async (req, res) => {
    const tasks = await Task.find({}) // Empty dict means it gets all tasks
    // Different ways of showing API call has succeeded
    res.status(200).json({tasks})
    //res.status(200).json({tasks, amount: tasks.length})
    //res.status(200).json({success: true, data: {tasks, nbHits: tasks.length}})
    //res.status(200).json({status: "success", data: {tasks, nbHits: tasks.length}})
})

const createTask = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body)
    res.status(201).json({task})
})

const getTask = asyncWrapper(async (req, res, next) => {
    const {id: taskID} = req.params // Finds and gives variable name to id in request info
    if (!mongoose.Types.ObjectId.isValid(taskID)) { // Need to check if task with ID exists in MongoDB first
        return next(createCustomError(`No task with ID: ${taskID}`, 400))
    }
    const task = await Task.findOne({_id: taskID}) // Looks for corresponding task
    if (!task) { // Error if no task found
        return next(createCustomError(`No task with ID: ${taskID}`, 404)) // Next passes error to error handling class
    }
    return res.status(200).json({task})
})

const updateTask = asyncWrapper(async (req, res, next) => {
    const {id:taskID} = req.params
    if (!mongoose.Types.ObjectId.isValid(taskID)) {
        return next(createCustomError(`No task with ID: ${taskID}`, 400))
    }
    const task = await Task.findOneAndUpdate(
        {_id: taskID}, 
        req.body, // Updates task with new request body
        {new: true, runValidators: true}) // Returns updated task, and makes sure it follows all validators when updating variables
    if (!task) {
        return next(createCustomError(`No task with ID: ${taskID}`, 404)) // Next passes error to error handling class
    }
    return res.status(200).json({task})
})

const deleteTask = asyncWrapper(async (req, res, next) => {
    const {id:taskID} = req.params
    if (!mongoose.Types.ObjectId.isValid(taskID)) {
        return next(createCustomError(`No task with ID: ${taskID}`, 400))
    }
    const task = await Task.findOneAndDelete({_id:taskID})
    if (!task) {
        return next(createCustomError(`No task with ID: ${taskID}`, 404)) // Next passes error to error handling class
    }
    // return res.status(200).json({task}) // Can display task that was just deleted
    // return res.status(200).send()
    return res.status(200).json({task: null, status: "success"})
})

export {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}