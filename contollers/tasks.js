import Task from "../models/tasks.js"

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({}) // Empty dict means it gets all tasks
        res.status(200).json({tasks})
    } catch (err) {
        res.status(500).json({msg: err})
    }
    res.send("All items")
}

const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body)
        res.status(201).json({task})
    } catch(err) {
        res.status(500).json({msg:err}) // Displays error message if task enetered incorrectly
    }
}

const getTask = async (req, res) => {
    try {
        const {id: taskID} = req.params // Finds and gives variable name to id in request info
        const task = await Task.findOne({_id: taskID}) // Looks for corresponding task
        if (!task) {
            return res.status(404).json({msg: `No task with ID ${taskID}`}) // Error if no task found
        }
        return res.status(200).json({task})
        
    } catch (err) {
        return res.status(500).json({msg: err}) // Error if URL syntax is incorrect
    }
}

const updateTask = async (req, res) => {
    try {
        const {id:taskID} = req.params

        const task = await Task.findOneAndUpdate(
            {_id: taskID}, 
            req.body, // Updates task with new request body
            {new: true, runValidators: true}) // Returns updated task, and makes sure it follows all validators when updating variables
        if (!task) {
            return res.status(404).json({msg: `No task with ID ${taskID}`}) // Error if no task found
        }
        return res.status(200).json({task})
    } catch (err) {
        return res.status(500).json({msg: err}) // Error if URL syntax is incorrect
    }
}

const deleteTask = async (req, res) => {
    try {
        const {id:taskID} = req.params
        const task = await Task.findOneAndDelete({_id:taskID})
        if (!task) {
            return res.status(404).json({msg: `No task with ID ${taskID}`}) // Error if no task found
        }
        // return res.status(200).json({task}) // Can display task that was just deleted
        // return res.status(200).send()
        return res.status(200).json({task: null, status: "success"})
    } catch (err) {
        return res.status(500).json({msg: err}) // Error if URL syntax is incorrect
    }
}

export {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}