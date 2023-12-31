import { Request, Response } from "express";
import VaccineSlotModel, {
  ITimeSlot,
  IVaccineSlot,
} from "../../models/vaccineSlotModel";
import Users from "../../models/userModel";
import mongoose from "mongoose";

async function checkAvailableSlot(
  date: string,
  time: string
): Promise<boolean> {
  try {
    const vaccineSlot: IVaccineSlot | null = await VaccineSlotModel.findOne({
      date,
    }).exec();
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

async function updateRegisteredUserTime(
  date: string,
  phoneNumber: string,
  newTime: string
): Promise<void> {
  try {
    // Find the document by date
    const vaccineSlot = await VaccineSlotModel.findOne({ date });

    if (vaccineSlot) {
      // Find the subdocument by phoneNumber within the slots array
      for (const timeSlot of vaccineSlot.slots) {
        const registeredUser = timeSlot.registered_users.find(
          (user) => user.phoneNumber === phoneNumber
        );

        if (registeredUser) {
          // Update the time for the found subdocument
          registeredUser.time = newTime;

          // Save the changes
          await vaccineSlot.save();
          return;
        }
      }
    }
  } catch (error) {
    throw error;
  }
}

export const updateVaccineSlot = async (req: Request, res: Response) => {
  try {
    const { slotId, newTimeSlot } = req.body;
    // Ensure all required data is provided in the request body
    if (!slotId || !newTimeSlot) {
      return res.status(400).json({ message: "Incomplete data" });
    }
    //   const parsedDate = `${date}T00:00:00Z`
    const parsedSlotId = new mongoose.Types.ObjectId(slotId);

    const phoneNumber = req.user?.phoneNumber;
    if (!phoneNumber) {
      return res.status(404).json({ message: "PhoneNumber not found." });
    }
    const user = await Users.findOne({ phoneNumber });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userRegisteredSlot = await Users.findOne({
      phoneNumber,
      "registeredSlot._id": parsedSlotId,
    });
    let parsedDate = "";
    let matchedSubdocument;
    if (userRegisteredSlot) {
      matchedSubdocument = userRegisteredSlot?.registeredSlot.find(
        (slot) => slot._id.toString() == parsedSlotId.toString()
      );

      if (matchedSubdocument) {
        parsedDate = matchedSubdocument.date;
      } else {
        return res.status(404).json({ message: "Slot not found" });
      }
    } else {
      return res.status(400).json({ message: "Document not found" });
    }

    let is24hr: boolean = false;
    if (userRegisteredSlot) {
      const twentyFourHoursAgo = new Date();
      twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);
      is24hr = matchedSubdocument?.updatedAt >= twentyFourHoursAgo;
    } else {
      // No user document found with the provided _id
      console.log("No matching user document found.");
      return res
        .status(404)
        .json({ message: "No matchcing user document found." });
    }

    if (!is24hr) {
      return res
        .status(403)
        .json({ message: "Unable to update 24hr exceeded" });
    }

    // Check if new time slot is available or not

    const slotIsAvailable = await checkAvailableSlot(parsedDate, newTimeSlot);

    if (slotIsAvailable) {
      await Users.findOneAndUpdate(
        {
          phoneNumber,
          "registeredSlot._id": parsedSlotId,
        },
        {
          $set: { "registeredSlot.$.timeSlot": newTimeSlot },
        }
      );

      await updateRegisteredUserTime(parsedDate, phoneNumber, newTimeSlot);

      return res.status(200).json({ message: "slot updated successfully" });
    } else {
      return res
        .status(400)
        .json({ message: "new time slote is not available" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
