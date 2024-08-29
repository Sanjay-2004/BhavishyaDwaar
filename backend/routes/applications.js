import { Hono } from "hono";
import Application from "../models/application";
import Student from "../models/student";
import Opening from "../models/opening";

const applicationRouter = new Hono();

// Add Application
applicationRouter.post("/", async (c) => {
  const { studentId, roleId, resume } = await c.req.json();
  try {
    const student = await Student.findById(studentId);
    if (!student) {
      return c.text("Student not found", 404);
    }
    const company = await Opening.findById(roleId);
    if (!company) {
      return c.text("Company not found", 404);
    }
    const application = new Application({ studentId, roleId, resume });
    const res = await application.save();
    return c.json(res, 201);
  } catch (error) {
    return c.json(
      `Error here: ${error.message}` || "Internal Server Error",
      500
    );
  }
});

// Get All Applications
applicationRouter.get("/", async (c) => {
  try {
    const applications = await Application.find();
    if (applications.length === 0) {
      return c.json("No applications found", 404);
    }
    return c.json(applications, 200);
  } catch (error) {
    return c.json(
      `Error here: ${error.message}` || "Internal Server Error",
      500
    );
  }
});

// Get Application by ID
applicationRouter.get("/:id", async (c) => {
  try {
    const { id } = c.param();
    const application = await Application.findById(id);
    if (!application) {
      return c.json("Application not found", 404);
    }
    return c.json(application, 200);
  } catch (error) {
    return c.json(
      `Error here: ${error.message}` || "Internal Server Error",
      500
    );
  }
});

// Get Student's All Applications
applicationRouter.get("/student/:studentId", async (c) => {
  try {
    const { studentId } = c.param();
    const student = await Student.findById(studentId);
    if (!student) {
      return c.json("Student not found", 404);
    }
    const applications = await Application.find({ studentId });
    if (applications.length === 0) {
      return c.json("No applications found", 404);
    }
    return c.json(applications, 200);
  } catch (error) {
    return c.json(
      `Error here: ${error.message}` || "Internal Server Error",
      500
    );
  }
});

// Get all Role Applications
applicationRouter.get("/role/:roleId", async (c) => {
  try {
    const { roleId } = c.param();
    const role = await Opening.findById(roleId);
    if (!role) {
      return c.json("Role not found", 404);
    }
    const applications = await Application.find({ roleId });
    if (applications.length === 0) {
      return c.json("No applications found", 404);
    }
    return c.json(applications, 200);
  } catch (error) {
    return c.json(
      `Error here: ${error.message}` || "Internal Server Error",
      500
    );
  }
});

// Update Application
applicationRouter.put("/:id", async (c) => {
  const { applicationId } = c.param();
  const applicationData = await c.req.json();
  try {
    const application = await Application.findByIdAndUpdate(
      applicationId,
      applicationData,
      { new: true }
    );
    if (!application) {
      return c.json("Application not found", 404);
    }
    return c.json(application, 200);
  } catch (error) {
    return c.json(
      `Error here: ${error.message}` || "Internal Server Error",
      500
    );
  }
});

export default applicationRouter;
