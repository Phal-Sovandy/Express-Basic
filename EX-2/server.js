// server.js
import express from "express";
import courses from "./course.js";
import logger from "./EX-3-Middlewares/logger.js";
import creditValidator from "./EX-3-Middlewares/validateQuery.js";
import tokenValidator from "./EX-3-Middlewares/auth.js";
const app = express();
const PORT = 3000;
// Route: GET /departments/:dept/courses
app.use(express.json());
app.use(logger);

app.get(
  "/departments/:dept/courses",
  [tokenValidator, creditValidator],
  (req, res) => {
    const { dept } = req.params;
    const { level, minCredits, maxCredits, semester, instructor } = req.query;
    // Implementing the filter logic
    // Hint: Use the filter method to filter the courses array based on the provided criteria
    const min = minCredits ? Number(minCredits) : null;
    const max = maxCredits ? Number(maxCredits) : null;

    // This query validator is for EX-2
    if (min !== null && max !== null && min > max) {
      return res.status(400).send("Min credit is greater than max credit!");
    }

    const filteredCourses = courses.filter((course) => {
      return (
        course.department === dept &&
        (!level || course.level === level) &&
        (min === null || course.credits >= min) &&
        (max === null || course.credits <= max) &&
        (!semester ||
          course.semester.toLowerCase() === semester.toLowerCase()) &&
        (!instructor ||
          course.instructor.toLowerCase().includes(instructor.toLowerCase()))
      );
    });

    return res.status(200).json(filteredCourses);
  }
);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
