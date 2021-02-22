let global = require("../../global");
module.exports = {
name: "playing",
aliases: ["cs", "cp"],
category: "general",
run: async (client, message, args) => {


if(!global.music.link) return message.channel.send("There are no song playing.")

    message.channel.send(`Current song is: ${global.music.link}`)
}}