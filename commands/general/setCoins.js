let mongoose = require("mongoose")
const User = require("../../mongoose/schemas/userSchema");
let user;

const global = require("../../global.js")

module.exports = {
    name: "setcoins",
    category: "general",
    run: async (client, message, args) => {


        user = await global.read(message.author.id, message.guild.id)

        let previous = user.coins;


        await global.write(user, { coins: args[0] })


        user = await global.read(message.author.id, message.guild.id)
        
        message.channel.send(`Your previous balance was \`${previous}\` new balance is \`${user.coins}\``)
    }
}