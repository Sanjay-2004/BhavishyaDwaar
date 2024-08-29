import { Hono } from "hono";
import Opening from "../models/opening";

const openingsRouter = new Hono();

// Add Opening
openingsRouter.post("/", async (c) => {
  const companyData = await c.req.json();
  console.log(companyData);
  try {
    const company = new Opening(companyData);
    const res = await company.save();
    return c.json(res, 201);
  } catch (error) {
    return c.json(
      `Error here: ${error.message}` || "Internal Server Error",
      500
    );
  }
});

// Get all openings
openingsRouter.get("/", async (c) => {
  const companies = await Opening.find();
  return c.json(companies, 200);
});

// // Get closed openings
// openingsRouter.get("/notopen", async (c) => {
//   console.log("Received request at /closed");
//   try {
//     const companies = await Opening.find({ open: false });
//     return c.json(companies, 200);
//   } catch (error) {
//     return c.json(
//       `Error here: ${error.message}` || "Internal Server Error",
//       500
//     );
//   }
// });

// Get opening by ID
openingsRouter.get("/:companyId", async (c) => {
  const { companyId } = c.req.param();
  console.log(companyId);
  try {
    const company = await Opening.findById(companyId);
    if (!company) {
      return c.text("Company not found", 404);
    }
    return c.json(company, 200);
  } catch (error) {
    return c.json(
      `Error here: ${error.message}` || "Internal Server Error",
      500
    );
  }
});

// Get openings by Section
openingsRouter.get("/section/:section", async (c) => {
  const { section } = c.req.param();
  console.log(section);
  try {
    // Find openings where the section is in the sectionsAllowed array
    const companies = await Opening.find({
      sectionsAllowed: { $in: [section] },
    });
    if (companies.length === 0) {
      return c.text("No companies found for this section", 404);
    }
    return c.json(companies, 200);
  } catch (error) {
    return c.json(
      `Error here: ${error.message}` || "Internal Server Error",
      500
    );
  }
});

export default openingsRouter;
