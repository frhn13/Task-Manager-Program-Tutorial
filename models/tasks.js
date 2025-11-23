import mongoose from "mongoose"
const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Must provide a name"],
        trim: true,
        maxlength: [20, "Name cannot be more than 20 characters"]
    }, 
    completed: {
        type: Boolean,
        default: false
    }
})

// Makes model (table) for DB, instance of a model is called a document
export default mongoose.model("Task", TaskSchema)