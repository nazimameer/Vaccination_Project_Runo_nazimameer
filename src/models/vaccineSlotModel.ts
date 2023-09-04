import mongoose, { Document, Model, Schema } from "mongoose";

export interface ITimeSlot extends Document {
  time: string;
  dose: string;
  available_doses: number;
  registered_users: { phoneNumber: string; time: string; dose: string; }[];
}

export interface IVaccineSlot extends Document {
  date: Date;
  slots: ITimeSlot[];
}

const timeSlotSchema = new Schema<ITimeSlot>({
  time: String,
  dose: String,
  available_doses: Number,
  registered_users: [
    {
      phoneNumber: String,
      time: String,
      dose: String,
      available_doses: Number,
    },
  ],
});

const vaccineSlotSchema = new Schema<IVaccineSlot>({
  date: Date,
  slots: [timeSlotSchema],
});

const VaccineSlotModel: Model<IVaccineSlot> = mongoose.model<IVaccineSlot>(
  "VaccineSlot",
  vaccineSlotSchema
);

export default VaccineSlotModel