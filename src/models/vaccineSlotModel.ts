import mongoose, { Document, Model, Schema } from "mongoose";

interface IVaccineSlot extends Document {
  date: Date;
  timeSlot: string;
  status: string;
}

const vaccineSlotSchema = new Schema<IVaccineSlot>({
  date: Date,
  timeSlot: String,
  status: String,
});

const VaccineSlotModel: Model<IVaccineSlot> = mongoose.model<IVaccineSlot>(
  "VaccineSlot",
  vaccineSlotSchema
);

export default VaccineSlotModel;