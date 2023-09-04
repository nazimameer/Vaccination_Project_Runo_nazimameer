import * as express from "express";
const router = express.Router();
import { registerUser, loginUser } from '../controllers/user'
import { getAvailableSlot, regVaccineSlot } from '../controllers/vaccine'

router.post("/api/users/register", registerUser);
router.post("/api/users/login", loginUser);
router.get("/api/users/slot/availabe",getAvailableSlot);
router.post("/api/users/slot/register", regVaccineSlot);
router.put("/api/users/slot/update-slot");

module.exports = router;
