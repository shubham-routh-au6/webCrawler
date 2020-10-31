import express from "express";
import controller from "../controller/searchCon.mjs";

const router = express.Router();

router.get("/videos", controller.all);
router.post("/search", controller.search);

export default router;
