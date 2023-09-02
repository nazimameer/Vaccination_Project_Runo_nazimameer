import * as express from "express";
const router = express.Router();

router.post("/api/admin/login");
router.get("/api/admin/total-users");
router.get("/api/admin/total-slots");

module.exports = router;
