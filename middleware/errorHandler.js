module.exports = (err, req, res, next) => {
    let statusCode = 500
    switch (err.name) {
      case "SequelizeValidationError":
        err.message = err.errors.map(el => el.message)
      case "SequelizeDatabaseError":
        statusCode = 400
        break;
  
      case "SequelizeForeignKeyConstraintError":
      case "ForeignKeyConstraintError":
      case "notFound":
        statusCode = 404
        err.message = err.message? err.message : "request element not found"
        break;
  
      case "unauthorized":
      case "authenticationError":
        err.message = err.message? err.message : "User does not have permission"
        statusCode = 401
        break;
  
      case "badRequest":
      case "JsonWebTokenError":
      case "SequelizeUniqueConstraintError":
        statusCode = 400
        break;
  
      default:
        break;
    }
    res.status(statusCode).json({ error: err.message });
  }