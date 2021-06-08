const { HttpCode } = require('../helpers/constants');
const { CatsService } = require('../services');
const catsService = new CatsService();

const getAll = (_req, res, next) => {
  try {
    const cats = catsService.getAll();

    res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: {
        cats,
      },
    });
  } catch (e) {
    next(e);
  }
};

const getById = (req, res, next) => {
  try {
    const cat = catsService.getById(req.params);

    if (cat) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          cat,
        },
      });
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: 'Not found cat',
        data: 'Not Found',
      });
    }
  } catch (e) {
    next(e);
  }
};

const create = (req, res, next) => {
  try {
    const cat = catsService.create(req.body);

    res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      data: {
        cat,
      },
    });
  } catch (e) {
    next(e);
  }
};

const update = (req, res, next) => {
  try {
    const cat = catsService.update(req.params, req.body);

    if (cat) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          cat,
        },
      });
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: 'Not found cat',
        data: 'Not Found',
      });
    }
  } catch (e) {
    next(e);
  }
};

const updateStatus = (req, res, next) => {
  try {
    const cat = catsService.update(req.params, req.body);

    if (cat) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          cat,
        },
      });
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: 'Not found cat',
        data: 'Not Found',
      });
    }
  } catch (e) {
    next(e);
  }
};

const remove = (req, res, next) => {
  try {
    const cat = catsService.remove(req.params);

    if (cat) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          cat,
        },
      });
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: 'Not found cat',
        data: 'Not Found',
      });
    }
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  updateStatus,
  remove,
};
