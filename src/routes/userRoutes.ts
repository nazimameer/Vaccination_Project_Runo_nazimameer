import * as express from "express";
const router = express.Router();
import { registerUser, loginUser } from '../controllers/user'


router.post("/api/users/register", registerUser);
router.post("/api/users/login", loginUser);
router.get("/api/users/slot");
router.get("/api/users/slot/availabe");
router.post("/api/users/slot/register");
router.put("/api/users/slot/update-slot");

module.exports = router;
