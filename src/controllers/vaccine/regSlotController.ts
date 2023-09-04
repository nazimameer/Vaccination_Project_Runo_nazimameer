import { Request, Response } from "express";
import Users from "../../models/userModel";
import VaccineSlotModel, {
  ITimeSlot,
  IVaccineSlot,
  RegisteredUser
} from "../../models/vaccineSlotModel";

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
    // Define a function to check available doses for a specific date and time
    async function checkAvailableSlot(
      date: Date,
      time: string
    ): Promise<boolean> {
      try {
        const vaccineSlot: IVaccineSlot | null = await VaccineSlotModel.findOne(
          { date }
        ).exec();
        if (vaccineSlot) {
          // Find the corresponding time slot
          const timeSlot: ITimeSlot | undefined = vaccineSlot.slots.find(
            (slot) => slot.time === time
          );
          if (timeSlot && timeSlot.available_doses > 0) {
            // Available doses are greater than 0
            return true;
          }
        }
        // Either no matching slot found or available_doses <= 0
        return false;
      } catch (error) {
        console.log(error);
        return false;
      }
    }

    const doseAvailable = await checkAvailableSlot(date, timeSlot);

    if(!doseAvailable){
        return res.status(404).json({ message: "Sorry no dose available"});
    }

    const slotDetails = {
      phoneNumber: phoneNumber || "",
      time: timeSlot, // Replace with the actual time slot
      dose: doseType, // Replace with the dose information
    };
    const slotDetails2  = {
      date: new Date(date),
      dose: doseType,
      timeSlot: timeSlot,
    };

    // Create a new vaccine slot document
     await VaccineSlotModel.findOneAndUpdate(
        {
            date: new Date(date), // Match the date
            "slots.time": timeSlot, // Match the time inside the slots array
          },
          {
            $push: { "slots.$.registered_users": slotDetails }, // Push the data into the matched time slot
          },
    );
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
