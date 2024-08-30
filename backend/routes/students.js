import { Hono } from "hono";
import Student from "../models/student";

const studentsRouter = new Hono();

// Add Student
studentsRouter.post("/", async (c) => {
  const studentData = await c.req.json();
  console.log(studentData);
  try {
    const student = new Student(studentData);
    const res = await student.save();
    return c.json(res, 201);
  } catch (error) {
    return c.json(
      `Error here: ${error.message}` || "Internal Server Error",
      500
    );
  }
});

// All Students
studentsRouter.get("/", async (c) => {
  console.log("All Students");
  try {
    const students = await Student.find();
    return c.json(students, 200);
  } catch (error) {
    return c.json(
      `Error here: ${error.message}` || "Internal Server Error",
      500
    );
  }
});

// Placed Students
studentsRouter.get("/placed", async (c) => {
  try {
    const students = await Student.find({ placedCompany: { $ne: null } });
    return c.json(students, 200);
  } catch (error) {
    return c.json(
      `Error here: ${error.message}` || "Internal Server Error",
      500
    );
  }
});

// Unplaced Students
studentsRouter.get("/unplaced", async (c) => {
  try {
    const students = await Student.find({ placedCompany: null });
    return c.json(students, 200);
  } catch (error) {
    return c.json(
      `Error here: ${error.message}` || "Internal Server Error",
      500
    );
  }
});

// Student by ID
studentsRouter.get("/:rollNo", async (c) => {
  const { rollNo } = c.req.param();
  console.log(rollNo);
  try {
    const student = await Student.find({ rollno: rollNo });
    if (!student) {
      return c.text("Student not found", 404);
    }
    return c.json(student, 200);
  } catch (error) {
    return c.json(
      `Error here: ${error.message}` || "Internal Server Error",
      500
    );
  }
});

// Students by FS Section
studentsRouter.get("/section/:fsId", async (c) => {
  const { fsId } = c.req.param();
  try {
    const students = await Student.find({ fs: fsId });
    return c.json(students, 200);
  } catch (error) {
    return c.json(
      `Error here: ${error.message}` || "Internal Server Error",
      500
    );
  }
});

// Students by Company
studentsRouter.get("/company/:companyId", async (c) => {
  const { companyId } = c.req.param();
  try {
    const students = await Student.find({ placedCompany: companyId });
    return c.json(students, 200);
  } catch (error) {
    return c.json(
      `Error here: ${error.message}` || "Internal Server Error",
      500
    );
  }
});

// Unplaced Students by FS Section
studentsRouter.get("/unplaced/section/:fsId", async (c) => {
  const { fsId } = c.req.param();
  try {
    const students = await Student.find({
      fs: fsId,
      placedCompany: null,
    });
    return c.json(students, 200);
  } catch (error) {
    return c.json(
      `Error here: ${error.message}` || "Internal Server Error",
      500
    );
  }
});

// Unlaced Students by branch
studentsRouter.get("/unplaced/branch/:branchId", async (c) => {
  const { branchId } = c.req.param();
  try {
    const students = await Student.find({
      branch: branchId,
      placedCompany: null,
    });
    return c.json(students, 200);
  } catch (error) {
    return c.json(
      `Error here: ${error.message}` || "Internal Server Error",
      500
    );
  }
});

// Placed Students by FS Section
studentsRouter.get("/placed/section/:fsId", async (c) => {
  const { fsId } = c.req.param();
  try {
    const students = await Student.find({
      fs: fsId,
      placedCompany: { $ne: null },
    });
    return c.json(students, 200);
  } catch (error) {
    return c.json(
      `Error here: ${error.message}` || "Internal Server Error",
      500
    );
  }
});

// Placed Students by branch
studentsRouter.get("/placed/branch/:branchId", async (c) => {
  const { branchId } = c.req.param();
  try {
    const students = await Student.find({
      branch: branchId,
      placedCompany: { $ne: null },
    });
    return c.json(students, 200);
  } catch (error) {
    return c.json(
      `Error here: ${error.message}` || "Internal Server Error",
      500
    );
  }
});

// Update Student Placement
studentsRouter.put("/placed/:studentId", async (c) => {
  const { studentId } = c.req.param();
  const { companyId } = await c.req.json();
  try {
    const student = await Student.findByIdAndUpdate(
      studentId,
      { placedCompany: companyId },
      { new: true }
    );
    if (!student) {
      return c.text("Student not found", 404);
    }
    return c.json(student, 200);
  } catch (error) {
    return c.json(
      `Error here: ${error.message}` || "Internal Server Error",
      500
    );
  }
});

// Update Personal Details
studentsRouter.put("/personal/:studentId", async (c) => {
  const { studentId } = c.req.param();
  const studentData = await c.req.json();
  try {
    const student = await Student.findByIdAndUpdate(studentId, studentData, {
      new: true,
    });
    if (!student) {
      return c.text("Student not found", 404);
    }
    return c.json(student, 200);
  } catch (error) {
    return c.json(
      `Error here: ${error.message}` || "Internal Server Error",
      500
    );
  }
});

export default studentsRouter;
