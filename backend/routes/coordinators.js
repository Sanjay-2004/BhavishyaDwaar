import { Hono } from "hono";
import Coordinator from "../models/coordinator";

const coordinatorsRouter = new Hono();

coordinatorsRouter.get("/", async (c) => {
  const coordinators = await Coordinator.find();
  return c.json(coordinators, 200);
});

coordinatorsRouter.get("/:coordinatorId", async (c) => {
  const { coordinatorId } = c.req.param();
  try {
    const coordinator = await Coordinator.findById(coordinatorId);
    if (!coordinator) {
      return c.text("Coordinator not found", 404);
    }
    return c.json(coordinator, 200);
  } catch (error) {
    return c.json(
      `Error here: ${error.message}` || "Internal Server Error",
      500
    );
  }
});

coordinatorsRouter.post("/", async (c) => {
  const coordinatorData = await c.req.json();
  console.log(coordinatorData);
  try {
    const coordinator = new Coordinator(coordinatorData);
    const res = await coordinator.save();
    return c.json(res, 201);
  } catch (error) {
    return c.json(
      `Error here: ${error.message}` || "Internal Server Error",
      500
    );
  }
});

export default coordinatorsRouter;
