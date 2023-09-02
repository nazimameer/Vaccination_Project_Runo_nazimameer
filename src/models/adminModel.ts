import mongoose, { Document, Model, Schema } from "mongoose";

interface IAdmin extends Document {
  username: string;
  password: string;
}

const adminSchema = new Schema<IAdmin>({
  username: String,
  password: String,
});

const AdminModel: Model<IAdmin> = mongoose.model<IAdmin>("Admin", adminSchema);

export default AdminModel;
