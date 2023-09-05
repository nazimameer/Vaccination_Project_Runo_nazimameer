import * as express from "express";
const router = express.Router();
import { fetchSlots, fetchUsers, loginAdmin } from '../controllers/admin'
import { requireAdmin } from '../middleware'
router.post("/api/admin/login",loginAdmin);
router.get("/api/admin/total-users",requireAdmin, fetchUsers);
router.get("/api/admin/total-slots", requireAdmin, fetchSlots);

module.exports = router;
