const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
}
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    res.status(statusCode)
    res.json({
        error: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    })
}
// check for mongoose bad object id
const mongooseErrorHandler = (err, req, res, next) => {
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    res.status(400).json({ message: 'Invalid Object ID' });
  } else {
    next(err);
  }
}   
export { notFound, errorHandler, mongooseErrorHandler };