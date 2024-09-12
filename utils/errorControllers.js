const { Sequelize } = require("sequelize");
const AppError = require("./appError");

//Error handling functions
const handleForeignKeyConstraintError = (err) => {
  const message = `Invalid reference: The related record with ${err.fields} '${err.value}' does not exist.`;
  return new AppError(message, 400);
};

//Handle unique constraint error functions example: unique fields
const handleUniqueConstranitError = (err) => {
  const field = Object.keys(err.fields)[0]; // get the field name that caused the error
  const value = err.fields[field]; // get the value of the field
  const message = `Duplicate entry: '${value}' for field '${field}' already existed. Please use a different value.`;
  return new AppError(message, 400);
};

// Handle validation errors from Sequelize
const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

//Handle casting errors (invalid type provided)
const handleCastingErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}. Please provide a valid value.`;
  return new AppError(message, 401);
};

//Handle JWT Error
const handleJWTError = () =>
  new AppError("Invalid token. Please log in agin", 401);

//Handle JWT expire error
const handleJWTExpiredError = () =>
  new AppError("Your Token has expired! Please login again!!", 401);

//Development error sending
const sendErrorDev = (err, req, res) => {
  res.status(err.statuscode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

//Production Error sending
const sendErrorProd = (err, req, res) => {
  if (req.originalUrl.startsWith("/api")) {
    // API response
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }

    //Programming or other unknow error
    console.log("Error", err);
    return res.status(500).json({
      status: "error",
      message: " Something went very wrong!",
    });
  } else {
    // Rendered website response
    if (err.isOperational) {
      return res.status(err.statusCode).render("error", {
        title: "Something went wrong!",
        msg: err.message,
      });
    }

    console.log("Error", err);
    return res.status(err.statusCode).render("error", {
      title: "Something went wrong!",
      msg: "Please try again later,",
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  //Handle errors based on Development enviroment
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, req, res);
  }

  //Handle errors based on Production enviroment
  else if (process.env.NODE_ENV === "production") {
    // creat a new instance or shallow copy og err
    let error = Object.create(err);

    //Handle specific Sequelize error
    if (error instanceof Sequelize.ForeignKeyConstraintError) {
      error = handleForeignKeyConstraintError(err);
    }

    // Check for sepecific Sequelize errors
    if (error instanceof Sequelize.UniqueConstraintError) {
      error = handleUniqueConstranitError(err);
    }

    // Check for specific Sequelize errors
    if (error.name === "SequelizeValidationError") {
      error = handleValidationErrorDB();
    }

    //Handle casting errors (invalid type provided)
    if (error.name === "handleCastErrorDB") {
      error = handleCastingErrorDB(error);
    }

    //
    if (
      error instanceof Sequelize.DatabaseError &&
      error.original &&
      error.original.code === "ER_TRUNCATED_WRONG_VALUE"
    ) {
      error = handleCastingErrorDB(error);
    }

    if (error instanceof Sequelize.DatabaseError) {
      //Handle other SequelizeDatabaseError case
      const message =
        "Database operation failed. Please check your input and try again.";
      error = new AppError(message, 400);
    }

    if (error.name === "JsonWebTokenError") error = handleJWTError(error);
    if (error.name === "TokenExpiredError")
      error = handleJWTExpiredError(error);

    sendErrorProd(error, req, res);
  }
};
