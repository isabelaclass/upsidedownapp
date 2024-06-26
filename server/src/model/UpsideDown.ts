import mongoose from "mongoose"

const upsideDownSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  character: {
    required: true,
    type: String,
  },
  age: {
    required: true,
    type: String,
  },
  experience: {
    required: true,
    type: String,
  },
})

export const UpsideDownModel = mongoose.model("UpsideDown", upsideDownSchema)