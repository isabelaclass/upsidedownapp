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
  personagem: {
    required: true,
    type: String,
  },
  idade: {
    required: true,
    type: String,
  },
  experiencia: {
    required: true,
    type: String,
  },
})

export const UpsideDownModel = mongoose.model("UpsideDown", upsideDownSchema)