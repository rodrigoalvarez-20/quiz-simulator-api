import mongoose, { Schema, Document, mongo } from "mongoose";

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  displayName: string;
  email: string;
  results: [];
}

const UserSchema: Schema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true, unique: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  },
  displayName: { type: String, required: true },
  results: { type: [], required: false },
});

export default mongoose.model<IUser>("User", UserSchema);
