import { model, Schema } from "mongoose";

const studentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: false,
    enum: ["Male", "Female", "Other"],
  },
  rollno: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: false,
  },
  branch: {
    type: String,
    required: false,
    enum: ["CSE", "CSM", "CSD", "IT"],
  },
  section: {
    type: String,
    required: false,
    enum: ["A", "B", "C", "D", "E", "F", "G"],
  },
  fs: {
    type: String,
    required: false,
    enum: ["Elite", "A1-1", "A1-2", "A2", "NFS"],
    default: "NFS",
  },
  tenthgpa: Number,
  twelfthgpa: Number,
  btechCgpa: Number,
  placedCompany: {
    type: Schema.Types.ObjectId,
    ref: "Opening",
    required: false,
    default: null,
  },
});

const Student = model("Student", studentSchema);

export default Student;
