import catchAsync from './../utils/cathAsync.js';
import AppError from './../utils/appError.js';

const deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError(`Document not found with this ID`, 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

export { deleteOne };
