const Hotel = require("../model/hotel.model")
const getAllHotelHandler = async (req, res) => {
    const hotelCategory = req.query.hotelCategory;
    try {
        let hotels;
        if (hotelCategory) {
            // Find hotels by category
            hotels = await Hotel.find({ category: hotelCategory });
        } else {
            // Find all hotels
            hotels = await Hotel.find({});
        }

        // Check if hotels are found
        if (hotels.length > 0) {
            res.json(hotels);
        } else {
            res.status(404).json({ message: "No data found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error fetching hotels" });
    }
}

module.exports = getAllHotelHandler