import * as express from "express";
const router = express.Router();
import { registerUser, loginUser } from "../controllers/user";
import {
  getAvailableSlot,
  regVaccineSlot,
  updateVaccineSlot,
} from "../controllers/vaccine";
import { verifyAuth } from "../middleware";

router.post("/api/users/register", registerUser);
router.post("/api/users/login", loginUser);
router.get("/api/users/slot/availabe", verifyAuth, getAvailableSlot);
router.post("/api/users/slot/register", verifyAuth, regVaccineSlot);
router.put("/api/users/slot/update-slot", verifyAuth, updateVaccineSlot);

module.exports = router;
