class CustomAPIError extends Error { // Error is built in class
    constructor (message, statusCode) {
        super(message)
        this.statusCode = statusCode
    }
}

const createCustomError = (msg, statusCode) => {
    return new CustomAPIError(msg, statusCode)
}

export {createCustomError, CustomAPIError}