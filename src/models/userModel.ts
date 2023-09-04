import mongoose, { Document, Model, Schema } from "mongoose";

interface ISlot {
  _id: mongoose.Types.ObjectId;
  date: string;
  dose: string;
  timeSlot: string;
  status: string;
  updatedAt: Date;
}

export interface IUser extends Document {
  name: string;
  phoneNumber: string;
  age: number;
  pincode: string;
  aadharNo: number;
  password: string;
  vaccinationStatus: string;
  registeredSlot: Array<ISlot>;
}

const slotSchema = new Schema<ISlot>(
  {
    date: String,
    dose: String,
    timeSlot: String,
    status: String,
  },
  {
    timestamps: true, // Apply timestamps to ISlot schema
  }
);

const userSchema = new Schema<IUser>({
  name: String,
  phoneNumber: String,
  age: Number,
  pincode: String,
  aadharNo: Number,
  password: String,
  vaccinationStatus: {
    type: String,
    default: "",
  },
  registeredSlot: [slotSchema],
});

const Users: Model<IUser> = mongoose.model<IUser>("User", userSchema);
export default Users;
