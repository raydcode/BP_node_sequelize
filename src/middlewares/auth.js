import ErrorResponse from "../utilities/errorResponse";
import jwt from "jsonwebtoken";

exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  // set token to cookie
  // else if(req.cookies.token){
  //     token = req.cookies.token;
  // }

  //Token Exsits
  if (!token) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }

  try {
    // verify token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    next();
  } catch (error) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }
});
