import { model, Schema } from "mongoose";

const openingSchema = new Schema({
  companyName: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  internshipDuration: {
    type: String,
    required: false,
  },
  internshipStipend: {
    type: Number,
    required: false,
  },
  internshipStart: {
    type: Date,
    required: false,
  },
  ctc: {
    type: Number,
    required: true,
  },
  jobDescription: {
    type: String,
    required: true,
  },
  sectionsAllowed: {
    type: [String],
    required: true,
    enum: ["Elite", "A1-1", "A1-2", "A2", "NFS"], // Only these values are allowed
  },
  uploadedBy: {
    type: Schema.Types.ObjectId,
    ref: "Coordinator",
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
  lastDate: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  additionalDetails: {
    type: [String],
    required: false,
  },
});

const Opening = model("Opening", openingSchema);

export default Opening;
