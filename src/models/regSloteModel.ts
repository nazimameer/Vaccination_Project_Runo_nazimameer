import mongoose, { Document, Model, Schema, mongo } from "mongoose";

export interface IRegSlot extends Document {
  phoneNumber: string;
  date: Date;
  dose: string;
  timeSlot: string;
  isAvailable: boolean;
}

const regSlotSchema = new Schema<IRegSlot>({
  phoneNumber: String,
  date: Date,
  dose: String,
  timeSlot: String,
  isAvailable: {
    type: Boolean,
    default: true,
  },
});

const regSlotModel: Model<IRegSlot> = mongoose.model<IRegSlot>(
  "RegisteredSlot",
  regSlotSchema
);

export default regSlotModel;
