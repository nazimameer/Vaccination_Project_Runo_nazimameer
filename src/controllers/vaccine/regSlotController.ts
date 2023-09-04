import { Request, Response } from "express";
import Users from "../../models/userModel";
import regSlotModel, { IRegSlot } from "../../models/regSloteModel";

export const regVaccineSlot = async (req: Request, res: Response) => {
  try {
    const { date, timeSlot, doseType } = req.body;
    const phoneNumber = req.user?.phoneNumber;

    // Ensure all required data is provided in the request body
    if (!date || !timeSlot || !doseType) {
      return res.status(400).json({ message: "Incomplete data" });
    }

    // Check if user selected correct doseType or not
    const user = await Users.findOne({ phoneNumber });
    if (user?.vaccinationStatus === doseType) {
      return res
        .status(400)
        .json({ message: `You already completed the ${doseType}` });
    }

async function checkAvailableSlot(date: Date, time: string): Promise<boolean> {
    try {
        const vaccineSlot: IVaccineSlot | null = await VaccineSlotModel.findOne({ date }).exec();
    } catch (error) {
        console.log(error);
        return false;
    }
}

    const slotDetails = {
      phoneNumber: phoneNumber || "",
      date: new Date(date), // Replace with the actual date
      dose: doseType, // Replace with the dose information
      timeSlot: timeSlot, // Replace with the actual time slot
    };
    const slotDetails2 = {
      date: new Date(date),
      dose: doseType,
      timeSlot: timeSlot,
      status: "Pending",
    };

    // Create a new vaccine slot document
    const newSlot = new regSlotModel(slotDetails);
    await newSlot.save();
    await Users.findByIdAndUpdate(
      phoneNumber,
      {
        $push: { registeredSlot: slotDetails2 },
      },
      { new: true }
    );

    return res.json({ message: "Slot registered successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Registration unsuccessful" });
  }
};
