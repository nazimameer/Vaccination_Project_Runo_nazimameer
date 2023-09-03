import * as express from "express";
const router = express.Router();

router.post("/api/users/register");
router.post("/api/users/login");
router.get("/api/users/slot");
router.post("/api/users/slot/register");
router.put("/api/users/slot/update-slot");

module.exports = router;
