import mongoose, { Schema, Document } from "mongoose";
import random from "mongoose-simple-random";

export interface INSQuestion extends Document {
  _id: mongoose.Types.ObjectId;
  questionImgUrl: string;
  question: string;
  answer: string;
  answerImgUrl: string;
  inc1: string;
  inc1ImgUrl: string;
  inc2: string;
  inc2ImgUrl: string;
  inc3: string;
  inc3ImgUrl: string;
  university: string;
  area: string | "";
  subject: string;
}

const NSQuestionSchema: Schema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true, unique: true },
  questionImgUrl: { type: String, required: false },
  question: { type: String, required: false },
  answer: { type: String, required: false },
  answerImgUrl: { type: String, required: false },
  inc1: { type: String, required: false },
  inc1ImgUrl: { type: String, required: false },
  inc2: { type: String, required: false },
  inc2ImgUrl: { type: String, required: false },
  inc3: { type: String, required: false },
  inc3ImgUrl: { type: String, required: false },
  university: { type: String, required: true },
  area: { type: String, required: false },
  subject: { type: String, required: true },
});

NSQuestionSchema.plugin(random);

export default mongoose.model<INSQuestion>("NSQuestion", NSQuestionSchema);
