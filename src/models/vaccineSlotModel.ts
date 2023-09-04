import mongoose, { Document, Model, Schema } from "mongoose";

export interface RegisteredUser extends Document {
  phoneNumber: string;
  time: string;
  dose: string;
  status: string;
}
export interface ITimeSlot extends Document {
  time: string;
  dose: string;
  available_doses: number;
  registered_users: RegisteredUser[];
}

export interface IVaccineSlot extends Document {
  date: string;
  slots: ITimeSlot[];
  updatedAt: Date;
}

const timeSlotSchema = new Schema<ITimeSlot>({
  time: String,
  dose: String,
  available_doses: Number,
  registered_users: [
    {
      _id: mongoose.Types.ObjectId,
      phoneNumber: String,
      time: String,
      dose: String,
      status: String,
    },
  ],
});

const vaccineSlotSchema = new Schema<IVaccineSlot>({
  date: String,
  slots: [timeSlotSchema],
});

const VaccineSlotModel: Model<IVaccineSlot> = mongoose.model<IVaccineSlot>(
  "VaccineSlot",
  vaccineSlotSchema
);

export default VaccineSlotModel;
