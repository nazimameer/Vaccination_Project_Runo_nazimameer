import * as express from "express";
const router = express.Router();

router.post("/api/users/register");
router.post("/api/users/login");
router.get("/api/users/slot");
router.get("/api/users/slot/availabe");
router.post("/api/users/register-login");
router.put("/api/users/update-slot");

module.exports = router;
