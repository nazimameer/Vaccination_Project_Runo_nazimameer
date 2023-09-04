import { Request, Response } from "express";
import VaccineSlotModel, { IVaccineSlot } from "../../models/vaccineSlotModel";
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
    // const registeredSlot = await VaccineSlotModel.findOne(
    //     {
    //         date:parsedDate,
    //         'slots.registered_users._id': parsedSlotId
    //     });
    const userRegisteredSlot = await Users.findOne(
        {
            phoneNumber,
            'registeredSlot._id': parsedSlotId,
        },
        {
            'registeredSlot.$': 1, // Retrieve only the matched subdocument
        })
        let is24hr: boolean = false;
        if (userRegisteredSlot) {
            const matchedRegisteredSlot = user.registeredSlot[0]; // Access the first (and only) matched subdocument
            const twentyFourHoursAgo = new Date();
            twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);
            is24hr = matchedRegisteredSlot?.updatedAt >= twentyFourHoursAgo;
          } else {
            // No user document found with the provided _id
            console.log('No matching user document found.');
            return res.status(404).json({ message: "No matchcing user document found."})
          }

          if(!is24hr){
            return res.status(403).json({ message: "Unable to update 24hr exceeded"});
          }

          // Check if new time slot is available or not

          async function getVaccineSlot(
            date: Date,
            dose: string
          ): Promise<IVaccineSlot[]> {
            try {
              const vaccineSlots: IVaccineSlot[] = await VaccineSlotModel.find({
                date,
                "slots.dose": dose,
              }).exec();
              return vaccineSlots;
            } catch (error) {
              throw error;
            }
          }


           await Users.findOneAndUpdate(
            {
                phoneNumber,
                'registeredSlot._id': parsedSlotId,
            }
           )



    } catch (error) {
        
    }
}