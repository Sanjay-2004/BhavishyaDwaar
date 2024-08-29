import { Hono } from "hono";
import { poweredBy } from "hono/powered-by";
import { logger } from "hono/logger";
import connectDB from "../db/connect";
import applicationRouter from "../routes/applications";
import coordinatorsRouter from "../routes/coordinators";
import openingsRouter from "../routes/openings";
import studentsRouter from "../routes/students";

const app = new Hono();

app.use(poweredBy());
app.use(logger());

connectDB();

app.route("/applications", applicationRouter);
app.route("/coordinators", coordinatorsRouter);
app.route("/openings", openingsRouter);
app.route("/students", studentsRouter);

app.onError((err, c) => {
  console.log(err);
  return c.text(`Error: ${err.message}`, 500);
});

export default app;
