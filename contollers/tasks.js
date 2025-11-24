import Task from "../models/tasks.js"
import asyncWrapper from "../middleware/async.js"

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

const getTask = asyncWrapper(async (req, res) => {
    const {id: taskID} = req.params // Finds and gives variable name to id in request info
    const task = await Task.findOne({_id: taskID}) // Looks for corresponding task
    if (!task) {
        return res.status(404).json({msg: `No task with ID ${taskID}`}) // Error if no task found
    }
    return res.status(200).json({task})
})

const updateTask = asyncWrapper(async (req, res) => {
    const {id:taskID} = req.params

    const task = await Task.findOneAndUpdate(
        {_id: taskID}, 
        req.body, // Updates task with new request body
        {new: true, runValidators: true}) // Returns updated task, and makes sure it follows all validators when updating variables
    if (!task) {
        return res.status(404).json({msg: `No task with ID ${taskID}`}) // Error if no task found
    }
    return res.status(200).json({task})
})

const deleteTask = asyncWrapper(async (req, res) => {
    const {id:taskID} = req.params
    const task = await Task.findOneAndDelete({_id:taskID})
    if (!task) {
        return res.status(404).json({msg: `No task with ID ${taskID}`}) // Error if no task found
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