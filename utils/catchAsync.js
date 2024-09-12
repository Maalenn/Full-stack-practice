/**
 * @param inputFunction - controller function
 * @returns Catch the Error the throw it to AppError class
 *
 */
const catchAsync = (inputFunction) => {
  return (req, res, next) => {
    inputFunction(req, res, next).catch(next);
  };
};

module.exports = catchAsync;
