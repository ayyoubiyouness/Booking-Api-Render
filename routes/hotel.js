import express from "express";
import Hotel from "../models/Hotel.js";
import { countBycity, countBytype, createHotel, deleteHotel, getHotel, getHotelRooms, getHotels, updateHotel } from "../controllers/hotel.js";
import { verifyAdmin, verifyToken } from "../utils/verifyToken.js";
const router = express.Router();

// create
router.post("/", createHotel)

// update
router.put("/:id",  updateHotel)

// delete
router.delete("/:id",  deleteHotel)

// get
router.get("/find/:id",  getHotel)

// Get All
router.get("/", getHotels)

router.get("/coutByCity", countBycity)

router.get("/coutByType", countBytype)

router.get("/room/:id", getHotelRooms)


export default router