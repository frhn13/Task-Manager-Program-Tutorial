const asyncWrapper = (fn) => { // Passes in controller function
    return async (req, res, next) => {
        try {
            await fn(req, res, next) // Does CRUD operation if successful and promise is kept
        } catch (err) {
            next(err) // Otherwise gives an error if promise is rejected
        }
    }
}

export default asyncWrapper