import { model, Schema } from "mongoose";

const studentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female", "Other"],
  },
  rollno: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
    enum: ["CSE", "CSM", "CSD", "IT"],
  },
  section: {
    type: String,
    required: true,
  },
  fs: {
    type: String,
    required: true,
    enum: ["Elite", "A1-1", "A1-2", "A2", "NFS"],
    default: "NFS",
  },
  tenthgpa: {
    type: Number,
    required: true,
  },
  twelfthgpa: {
    type: Number,
    required: true,
  },
  btechCgpa: {
    type: Number,
    required: true,
  },
  placedCompany: {
    type: Schema.Types.ObjectId,
    ref: "Opening",
    required: false,
    default: null,
  },
});

const Student = model("Student", studentSchema);

export default Student;
