const express = require("express")
const PORT = 3500;
const app = express();


const mongoose = require("mongoose")
const connectDB = require('./config/dbconfig');

const hotelDataAddedToDBRouter = require("./routes/dataimport.router")
const categoryDataAddedToDBRouter = require("./routes/categoryimport.router")
const categoryRouter = require("./routes/category.router")
const hotelRouter = require("./routes/hotel.router")
const singleHotelRouter = require("./routes/singlehotel.router")
const authRouter = require("./routes/auth.router")
const wishlistRouter = require("./routes/wishlist.router")

app.use(express.json())

connectDB();

app.get("/",(req,res)=>{
    res.send("Hello")
})

app.use("/api/hotelData",hotelDataAddedToDBRouter)
app.use("/api/categorydata",categoryDataAddedToDBRouter)
app.use("/api/hotels",hotelRouter)
app.use("/api/category",categoryRouter)
app.use("/api/hotels",singleHotelRouter)
app.use("/api/auth",authRouter)
app.use("/api/wishlist",wishlistRouter)
mongoose.connection.once("open",()=>{
    console.log("Connected to DB")
    app.listen(process.env.PORT || PORT, ()=>{
    console.log("Server is up and running")
})
})
