import { Schema, model, InferSchemaType } from "mongoose";

// Define the User schema with the fields from the request body
const userSchema = new Schema({
  name: { type: String, required: true },
  profilePictureURL: { type: String, default: null },
});

// Define the type for the User model
type User = InferSchemaType<typeof userSchema>;

// Export the User model
export default model<User>("User", userSchema);
