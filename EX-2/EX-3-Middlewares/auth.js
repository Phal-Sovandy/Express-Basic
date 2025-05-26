const TOKEN_KEY = "xyz123";

export default function tokenValidator(req, res, next) {
  const { token } = req.query;
  if (token == undefined) {
    res.status(401).send("Missing Token!");
  }
  if (token !== TOKEN_KEY) {
    res.status(401).send(`Incorrect token: ${token}`);
  }
  next();
}
