import express from "express"
const app = express()
import tasks from "./routes/tasks.js"

// Middleware
// parse json
app.use(express.json()) 

// routes
app.get("/hello", (req, res) => {
    return res.send("Task Manager App")
})

app.use("/api/v1/tasks", tasks)

const port = 3000

app.listen(port, console.log(`Server is listening on port ${port}...`))