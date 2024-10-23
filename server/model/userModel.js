const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  
    username: {
        type: String,
        min: 3,
        max: 15,
        required: true,
        unique: true
    },
    email: {
        type: String,
        max: 25,
        required: true,
        unique: true
    },
    password: {
        type: String,
        min: 8,
        max: 35,
        required: true,
        unique: true
    },
    isAvatarImageSet: {
        type: Boolean,
        default: false
    },
    avatarImage: {
        type: String,
        default:""
    }
    
});
module.exports= mongoose.model("Users", userSchema);