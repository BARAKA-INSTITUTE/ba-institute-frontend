import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const contactSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

export const ContactEntry = models.ContactEntry || model("ContactEntry", contactSchema);
