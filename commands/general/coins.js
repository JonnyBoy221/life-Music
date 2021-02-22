const global = require("../../global.js")
module.exports = {
    name: "coins",
    category: "general",
    run: async (client, message, args) => {

        const user = await global.read(message.author.id, message.guild.id)

        message.channel.send(`You have \`${user.coins}\` coins`)

    }
}