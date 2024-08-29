import { model, Schema } from "mongoose";

const coordinatorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: "placement_coordinator",
  },
});

const Coordinator = model("Coordinator", coordinatorSchema);

export default Coordinator;
