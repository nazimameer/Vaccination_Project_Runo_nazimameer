import mongoose, { Document, Model, Schema } from "mongoose";

interface ISlot {
  date: Date;
  dose: string;
  timeSlot: string;
  status: string;
}

export interface IUser extends Document {
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
  vaccinationStatus: {
    type:String,
    default:""
  },
  registeredSlot: [
    {
      date: Date,
      dose: String,
      timeSlot: String,
      status: String,
    },
  ],
});

const Users: Model<IUser> = mongoose.model<IUser>("User", userSchema);
export default Users;
