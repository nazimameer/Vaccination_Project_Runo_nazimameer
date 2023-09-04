import { Request, Response } from "express";
import VaccineSlotModel from "../../models/vaccineSlotModel";
import Users from "../../models/userModel";
import mongoose from "mongoose";

export const updateVaccineSlot = async (req: Request, res: Response) => {

    try {
        const { date, slotId, newTimeSlot } = req.body;
        // Ensure all required data is provided in the request body
    if ( !date ||!slotId || !newTimeSlot ) {
        return res.status(400).json({ message: 'Incomplete data' });
      }
      const parsedDate = `${date}T00:00:00Z`
      const parsedSlotId = new mongoose.Types.ObjectId(slotId);
      const phoneNumber = req.user?.phoneNumber;
      const user = await Users.findOne({phoneNumber});
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

       // Find the registered slot by slot ID
    const registeredSlot = await VaccineSlotModel.findOne(
        {
            date:parsedDate,
            'slots.registered_users._id': parsedSlotId
        });

        if (!registeredSlot) {
  return res.status(404).json({ message: 'Registered slot not found' });
        }

        // Check it's updated within 24hr or not
        const twentyFourHoursAgo = new Date();
        twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);
        const isTwentyfourhours = registeredSlot.updatedAt >= twentyFourHoursAgo;
      
    } catch (error) {
        
    }
}