import { Request, Response } from "express";
import VaccineSlotModel, { IVaccineSlot } from "../../models/vaccineSlotModel";
import Users, { IUser } from "../../models/userModel";
import mongoose from "mongoose";

// Define constants for dose statuses to improve code readability
const DOSE_STATUS = {
  FIRST_DOSE: "first-dose",
  SECOND_DOSE: "second-dose",
  COMPLETED: "completed",
};

// Helper function to handle errors and send responses
const handleError = (res: Response, statusCode: number, message: string) => {
  console.error(message);
  return res.status(statusCode).json({ message });
};

export const getAvailableSlot = async (req: Request, res: Response) => {
  try {
    const { date } = req.query;
    // Ensure date is provided in the request
    if (!date || typeof date !== "string") {
      return handleError(res, 400, "Date is required");
    }
    const parsedDate = `${date}T00:00:00Z`;
    const phoneNumber: any = req.user?.phoneNumber;

    // Find the user based on the phone number
    const user = await Users.findOne({ phoneNumber });
    if (!user) {
      return handleError(res, 404, "User not found");
    }
    const vaccinationStatus = user?.vaccinationStatus;

    // Determine the dose needed based on the vaccination status
    let doseNeed: string = "";
    switch (vaccinationStatus) {
      case DOSE_STATUS.FIRST_DOSE:
        doseNeed = DOSE_STATUS.SECOND_DOSE;
        break;
      case DOSE_STATUS.SECOND_DOSE:
        doseNeed = DOSE_STATUS.COMPLETED;
        break;
      default:
        doseNeed = DOSE_STATUS.FIRST_DOSE;
        break;
    }

    if (doseNeed === DOSE_STATUS.COMPLETED) {
      return handleError(
        res,
        400,
        "Your two doses of vaccination are completed"
      );
    }

    // Helper function to get vaccine slots
    async function getVaccineSlot(
      date: string,
      dose: string
    ): Promise<IVaccineSlot[]> {
      try {
        console.log(parsedDate);
        const vaccineSlots: IVaccineSlot[] = await VaccineSlotModel.find({
          date,
          "slots.dose": dose,
        }).exec();
        return vaccineSlots;
      } catch (error) {
        throw error;
      }
    }

    const slotAvailable = await getVaccineSlot(parsedDate, doseNeed);
    if (slotAvailable.length === 0) {
      return handleError(res, 200, "No available slots for this date and dose");
    }
    return res.status(200).json({ slotAvailable });
  } catch (error) {
    console.log(error);
    return handleError(res, 500, "Internal server error");
  }
};
