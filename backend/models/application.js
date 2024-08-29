import { model, Schema } from "mongoose";

const applicationSchema = new Schema({
  studentId: {
    type: Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  roleId: {
    type: Schema.Types.ObjectId,
    ref: "Opening",
    required: true,
  },
  resume: {
    type: String,
    required: true,
  },
  appliedAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    required: true,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
});

const Application = model("Application", applicationSchema);

export default Application;
