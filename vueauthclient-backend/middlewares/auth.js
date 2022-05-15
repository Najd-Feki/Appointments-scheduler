const authMiddleware = (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.status(401).send("You are nor authenticated");
  } else {
    return next();
  }
};
export default authMiddleware;
