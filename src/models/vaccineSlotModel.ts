import mongoose, { Document, Model, Schema } from "mongoose";

export interface IVaccineSlot extends Document {
  date: Date;
  dose: string;
  timeSlot: string;
  status: string;
}

const vaccineSlotSchema = new Schema<IVaccineSlot>({
  date: Date,
  dose: String,
  timeSlot: String,
  status: String,
});

const VaccineSlotModel: Model<IVaccineSlot> = mongoose.model<IVaccineSlot>(
  "VaccineSlot",
  vaccineSlotSchema
);

export default VaccineSlotModel;
