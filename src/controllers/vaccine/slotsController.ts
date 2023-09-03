import { Request, Response } from "express";
import VaccineSlotModel from "../../models/vaccineSlotModel";

export const getAvailableSlot = async (req: Request, res: Response) => {
  try {
    const { date, vaccinationStatus } = req.query;
    // Ensure date and vaccinationStatus are provided in the request
    if (!date || !vaccinationStatus) {
      return res
        .status(400)
        .json({ message: "Date and vaccinationStatus are required" });
    }

    // Query the VaccineSlotModel to find available slots
    const availableSlots = await VaccineSlotModel.find({
      date, // Match the requested date
      status: "available", // You can adjust this based on your slot status logic
    });

    return res.status(200).json({ availableSlots });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error"});
  }
};
