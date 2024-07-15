import JWT from "jsonwebtoken";
import User from "../models/User.js";
const jwtSecret = "HaHamynameisvklata"
//Protected Routes token base
export const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      jwtSecret
    //   process.env.JWT_SECRET
    );
    req.user = decode;
    // const id=decoded.user
    next();
  } catch (error) {
    console.log(error);
  }
};

//admin acceess
export const isAdmin = async (req, res, next) => {
    try {
      const user = await User.findById(req.user._id);
      console.log(user)
      if (!user.role== 1) {
        return res.status(401).send({
          success: false,
          message: "UnAuthorized Access",
        });
      } else {
        next();
      }
    } catch (error) {
      console.log(error);
      res.status(401).send({
        success: false,
        error,
        message: "Error in admin middelware",
      });
    }
  };