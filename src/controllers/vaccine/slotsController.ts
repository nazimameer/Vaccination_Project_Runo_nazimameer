import { Request, Response } from "express";
import VaccineSlotModel from "../../models/vaccineSlotModel";
import Users from "../../models/userModel";

export const getAvailableSlot = async (req: Request, res: Response) => {
  try {
    const { date } = req.query;
    // Ensure date is provided in the request
    if (!date) {
        return res
          .status(400)
          .json({ message: "Date is required" });
      }
    const phoneNumber: any = req.user?.phoneNumber;
    const user = await Users.findOne({phoneNumber});
    const vaccinationStatus = user?.vaccinationStatus;
   

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
