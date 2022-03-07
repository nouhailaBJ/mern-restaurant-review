const RestaurantModel = require('../models/restaurant.model')
const UserModel = require('../models/user.model')
const { body, validationResult } = require('express-validator')
const ObjectId = require("mongoose").Types.ObjectId;

exports.validate = (method) => {
    switch(method){
        case 'create' : {
            return [
                body('title', "title doesn't exists").exists(),
                body('desc', "desc doesn't exists").exists(),
                body('location', "location doesn't exists").exists(),
                body('date_works', "date_works doesn't exists").exists(),
                body('price_range', "price range doesn't exists").exists(),
                body('special_plats', "special plats doesn't exists").exists(),
                body('type', "type doesn't exists").exists(),
                body('tags', "tags doesn't exists").exists(),
                body('number', "number doesn't exists").exists(),
                body('email', "email doesn't exists").exists(),
                body('city', "city doesn't exists").exists(),
            ]
        }
    }
}

module.exports.index = async (req, res) => {
    try {
        const restaurants = await RestaurantModel.find({})
        res.status(200).json(restaurants);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

module.exports.create = async (req, res) => {
    if (!ObjectId.isValid(req.body.user._id))
        return res.status(400).send({ msg: "Unknown ID" });
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        res.status(400).json({errors: errors.array() })
        return ;
    }
    try{
        const restaurant = await RestaurantModel.create(req.body)
        const user = await UserModel.findById({_id: restaurant.user})
        user.restaurants.push(restaurant);
        await user.save();
        res.status(200).json({restaurant})
    }catch(err) {
        res.status(400).json({err})
    }
}