
const Wishlist = require('../model/hotel.model')
const createWishlistHandler = async (req,res)=>{
    const newWishList = new Wishlist(req.body);
    try{
        const saveWishList = await newWishList.save()
        res.status(201).json(saveWishList)

    }catch(err){
        res.status(500).json({message:"failed to create wishlist"})
    }
}


const deleteWishlistHandler  = async (req,res)=>{
    try{
    await Wishlist.findByIdAndDelete(req.params.id)
    res.json({message:"Hotel deleted"})
    }catch(err){
        res.status(500).json({message : "Could not delete hotel from wishlist"})
    }
}

const getWishlistHandler = async (req,res)=>{
    try{
        const wishlist = await Wishlist.find({})
        wishlist ? res.json(wishlist) : res.json({message:"No items found in wishlist"})
    }catch(err){
        console.log(err);
        res.status(500).json(err)
    }
}
module.exports ={ createWishlistHandler,deleteWishlistHandler,getWishlistHandler}