import mongoose, { Document, Model, Schema } from "mongoose";

interface ISlot {
  date: Date;
  timeSlot: string;
  status: string;
}

interface IUser extends Document {
  name: String;
  phoneNumber: string;
  age: number;
  pincode: string;
  aadharNo: number;
  password: string;
  vaccinationStatus: string;
  registeredSlot: Array<ISlot>;
}

const userSchema = new Schema<IUser>({
  name: String,
  phoneNumber: String,
  age: Number,
  pincode: String,
  aadharNo: Number,
  password: String,
  vaccinationStatus: String,
  registeredSlot: [
    {
      date: Date,
      timeSlot: String,
      status: String,
      ref:'VaccineSlot'
    },
  ],
});

const Users: Model<IUser> = mongoose.model<IUser>("User", userSchema);
export default Users;
