const asyncWrapper = (fn) => { // Passes in controller function
    return async (req, res, next) => {
        try {
            await fn(req, res, next) // Does CRUD operation if successful and promise is kept
        } catch (err) {
            next(err) // Otherwise passes it to error handling middleware if promise is rejected
        }
    }
}

export default asyncWrapper