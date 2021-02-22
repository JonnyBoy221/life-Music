const global = require("../../global");
module.exports = {
name: "shuffle",
aliases: ["sf"],
category: "general",
run: async (client, message, args) => {
    let queue = global.music.queue;
   
    if (queue.links.length < 1) return message.channel.send("The queue is empty");
    if (queue.links.length < 3) return message.channel.send("The queue must have more than 2 songs to shuffle the queue");

    for (let i = queue.links.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i)
        const temp = queue.links[i]
        const temp2 = queue.titles[i]
        queue.links[i] = queue.links[j]
        queue.titles[i] = queue.titles[j]
        queue.links[j] = temp
        queue.titles[j] = temp2
    }
    global.music.queue = queue;

    message.channel.send("The queue has been shuffled");

}}