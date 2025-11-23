import mongoose from "mongoose"
const other = "npm install mongodb"

const connectDB = (url) => { // Connects to MongoDB online database
    return mongoose.connect(url)
}

export default connectDB