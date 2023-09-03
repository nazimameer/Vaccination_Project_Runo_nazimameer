import mongoose, { Document, Model, Schema, mongo } from "mongoose";

export interface IRegSlot extends Document {
date: Date;
dose: string;
timeSlot: string;
isAvailable: boolean;
}

const regSlotSchema = new Schema<IRegSlot>({
    date: Date,
    dose: String,
    timeSlot: String,
    isAvailable: Boolean,
});


const regSlotModel: Model<IRegSlot> = mongoose.model<IRegSlot>(
    'RegisteredSlot',
    regSlotSchema
)

export default regSlotModel;