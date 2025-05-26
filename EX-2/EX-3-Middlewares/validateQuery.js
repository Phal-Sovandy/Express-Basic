export default function creditValidator(req, res, next) {
  const { minCredits, maxCredits } = req.query;
  if (minCredits !== undefined && !Number(minCredits)) {
    res.status(400).send("Min Credit MUST be number");
  }
  if (maxCredits !== undefined && !Number(maxCredits)) {
    console.log(maxCredits);
    res.status(400).send("Max Credit MUST be number");
  }
  if (
    minCredits !== undefined &&
    maxCredits !== undefined &&
    minCredits > maxCredits
  ) {
    res.status(400).send("Min Credit is greater than Max Credit");
  }
  next();
}
