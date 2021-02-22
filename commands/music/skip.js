let global = require("../../global")
module.exports = {
name: "skip",
category: "general",
run: async (client, message, args) => {
   
    let server = global.music.servers;
    let queue = global.music.queue;

    if (server.dispatcher) {
        if (!args[0]) {
            if (queue.links.length < 1) {
                message.member.voice.channel.leave()
                global.music.title="";
                global.music.link="";
                queue.links.length = 0;
                queue.titles.length = 0;
                server.dispatcher.destroy();
                message.channel.send("Queue empty.")
                return;
            }
            message.member.voice.channel.join().then(function (connection) {
                global.music.title="";
                global.music.link="";
                global.music.play(connection, message);
                message.channel.send(`Skipping Song...`);
            })
        } else {
            if (queue.links.length < 1) return message.channel.send("You cant skip songs when the queue is empty");
            if (isNaN(args[0])) return message.channel.send(`\`${args[0]}\` is not a number`)
            if (Math.round(args[0]) > queue.links.length) return message.channel.send(`There are not \`${Math.round(args[0])}\` songs in the queue`)
            for (var i = 1; i <= Math.round(args[0]) - 1; i++) {
                queue.links.shift();
                queue.titles.shift();
            }
            message.member.voice.channel.join().then(function (connection) {
                global.music.play(connection, message);
                message.channel.send(`Skipped ${Math.round(args[0])} Songs`);
            })

        }

    }



}}