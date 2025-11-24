import {CustomAPIError} from "../errors/custom-error.js"

const errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof CustomAPIError) { // Returns this error is error is caused task not existing in PUT, GET or DELETE (404)
        return res.status(err.statusCode).json({msg: err.message})
    }
    // Returns this error if URL is invalid (500)
    return res.status(500).json({msg: "Something went wrong, please try again"})
}

export default errorHandlerMiddleware