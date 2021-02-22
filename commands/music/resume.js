let global = require("../../global");
module.exports = {
name: "resume",
aliases: ["r"],
category: "general",
run: async (client, message, args) => {
   
    var server = global.music.servers;
    if (server.dispatcher) {
        server.dispatcher.resume();
        message.reply("Resuming the song...");
    }

}}