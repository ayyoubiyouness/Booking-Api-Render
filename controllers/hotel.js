import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js"

// create 
export const createHotel = async (req, res, next) => {

    const newHotel = new Hotel(req.body)
    try {
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel);
    } catch (error) {
        next(error)

    }
};

export const updateHotel = async (req, res, next) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedHotel);
    } catch (err) {
        next(err);
    }
};
export const deleteHotel = async (req, res, next) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json("Hotel has been deleted.");
    } catch (err) {
        next(err);
    }
};

export const getHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        res.status(200).json(hotel);
    } catch (err) {
        next(err);
    }
};

export const getHotels = async (req, res, next) => {
    const { min, max, limite, ...others } = req.query;
    try {
      const hotels = await Hotel.find({
        ...others,
        cheapestPrice: { $gt: min | 1, $lt: max || 9999 },
      }).limit(limite);
      res.status(200).json(hotels);
    } catch (err) {
      next(err);
    }
  };
export const countBycity = async (req, res, next) => {
    const cities = req.query.cities.split(",")
    try {
        const list = await Promise.all(
            cities.map((city) => {
                return Hotel.countDocuments({ city: city })
            })
        )
        res.status(200).json(list)

    } catch (error) {
        next(error)

    }

}

export const countBytype = async (req, res, next) => {
    try {

        const hotel = await Hotel.countDocuments({ type: "hotel" })
        const appartement = await Hotel.countDocuments({ type: "appartement" })
        const cabins = await Hotel.countDocuments({ type: "cabins" })
        const villas = await Hotel.countDocuments({ type: "villas" })
        const result = [
            {"type" : "hotel", "count" : hotel},
            {"type" : "appartement", "count" : appartement},
            {"type" : "cabins", "count" : cabins},
            {"type" : "villas", "count" : villas},
        ]
        res.status(200).json(result)
    } catch (error) {
        next(error)
    }


}

export const getHotelRooms = async(req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id)
        const list = await Promise.all(
            hotel.rooms.map((room) => {
                return Room.findById(room);
            })
        )
        res.status(200).json(list)
    } catch (error) {
        next(error)
        
    }
}