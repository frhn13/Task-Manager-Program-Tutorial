import connectDB from "./db/connect.js"
import express from "express"
const app = express()
import tasks from "./routes/tasks.js"
import dotenv from "dotenv"
dotenv.config() // Import needed to access .env file
import notFound from "./middleware/not-found.js"

// Middleware
app.use(express.static("./public"))
// parse json
app.use(express.json()) 

// routes
app.get("/hello", (req, res) => {
    return res.send("Task Manager App")
})
  
app.use("/api/v1/tasks", tasks)

app.use(notFound) // Middleware is called when URL is invalid

const port = 3000

const start = async () => {
    try {
        // If connection to DB is successful, then start up server
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening on port ${port}...`))
    }
    catch (err) {
        console.log(err)
    }
}

start()
