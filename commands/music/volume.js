let global = require("../../global")
module.exports = {
name: "volume",
aliases: [""],
category: "general",
run: async (client, message, args) => {
   
    var server = global.music.servers;

    if (global.music.link.length > 0) {

        if (!args[0]) return message.channel.send(`The volume is ${server.dispatcher.volume * 100}%`);

        if (isNaN(args[0]) || args[0] > 200 || args[0] < 0) return message.channel.send("Please input a number between 0 to 200");


        server.dispatcher.setVolume(args[0] / 100);
        message.channel.send(`Volume successfully set to ${args[0]}%`);

    } else {
        message.channel.send("No songs playing.")
    }

}}