const global = require("../../global");
module.exports = {
name: "bitrate",
aliases: ["br"],
category: "general",
run: async (client, message, args) => {
   
    if (isNaN(args[0]) || args[0] > 96 || args[0] < 8 || !args[0]) return message.channel.send("Please input a number between 8 to 96");

    if (args[0] > 64) message.channel.send("bitrate over 64 may result in sound buffering!");

    var server = global.music.servers;
    if (server.dispatcher) server.dispatcher.setBitrate(args[0]);
    message.channel.send(`Bitrate successfully set to ${args[0]}.`);

}}