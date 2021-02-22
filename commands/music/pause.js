let global = require("../../global");
module.exports = {
name: "pause",
aliases: ["p"],
category: "general",
run: async (client, message, args) => {
   
    var server = global.music.servers;
    if (server.dispatcher) {
        server.dispatcher.pause();
        message.reply("pausing the song...");
    }

}}