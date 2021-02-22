const mongoose = require("mongoose");

module.exports.run = (client) => {

const userSchema = new mongoose.Schema({
    guildID: {type: String},
    userID: {type: String},
    warnCount: {type: Number},
    kickCount: {type: Number},
    banCount: {type: Number},
    xp: {type: Number},
    level: {type: Number},
    rank: {type: Number},
    coins: {type: Number},
    bio: {type: String}
});

module.exports = mongoose.model("User", userSchema, "users");

};