import { Request, Response } from "express";
import Users from "../../models/userModel";
import regSlotModel,{IRegSlot} from "../../models/regSloteModel";

export const regVaccineSlot = async (req: Request, res: Response) => {
    try {
        const { date, timeSlot, doseType } = req.body;
        const phoneNumber = req.user?.phoneNumber;

        // Ensure all required data is provided in the request body
        if (!date || !timeSlot || !doseType) {
            return res.status(400).json({ message: 'Incomplete data' });
          }

        // Check if user selected correct doseType or not
        const user = await Users.findOne({phoneNumber});
        if(user?.vaccinationStatus === doseType){
            return res.status(400).json({message: `You already completed the ${doseType}` })
        }

        const slotDetails: IRegSlot = {
            date: new Date(date), // Replace with the actual date
            dose: "first", // Replace with the dose information
            timeSlot: "10:00 AM", // Replace with the actual time slot
          };


        

    } catch (error) {
        console.log(error);
    }
}