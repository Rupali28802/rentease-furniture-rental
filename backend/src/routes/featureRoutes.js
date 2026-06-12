import express from "express";
import { getFeature,createFeature } from "../controllers/featureController";


const router = express.router()

router.post("/",createFeature);
router.get("/",getFeature);
// router.post("/",createFeature);
// router.post("/",createFeature);
