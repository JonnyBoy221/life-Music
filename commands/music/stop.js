let global = require("../../global")

module.exports = {
    name: "stop",
    category: "general",
    run: async (client, message, args) => {

        var server = global.music.servers;
        if (server.dispatcher) server.dispatcher.destroy();
        global.music.title="";
        global.music.link="";
        global.music.queue.links.length = 0;
        global.music.queue.titles.length = 0;

        message.member.voice.channel.leave()
        message.channel.send("Stopped the current song and cleared the queue.");

    }
}