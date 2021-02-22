let global = require("../../global");
const { MessageEmbed } = require("discord.js")
const PaginationEmbed = require("discord-paginationembed");
module.exports = {
    name: "queue",
    category: "general",
    run: async (client, message, args) => {

        let queue = global.music.queue;


        if (queue.links.length < 1) return message.channel.send("The queue is empty");


        if (queue.links) {

            console.log(queue);



            const embeds = [];
            var i3 = 1;

            let embed = new MessageEmbed();

            for (let i = 1; i <= Math.ceil(queue.links.length / 15); ++i) {
                console.log(i)
                embed.setAuthor(`Page ${i} of ${Math.ceil(queue.links.length / 15)}`)
                test: for (let i2 = 1; i2 <= 15; i2++) {
                    embed.setDescription(embed.description == undefined ? `**${i3}:** ` + `[${queue.titles[i3 - 1].replace(/\|/g, "\\|")}](${queue.links[i3 - 1]})` : embed.description += '\n' + `**${i3}:** ` + `[${queue.titles[i3 - 1].replace(/\|/g, "\\|")}](${queue.links[i3 - 1]})`)
                    if (i3 === queue.links.length) break test;

                    i3 += 1;
                }
                await embeds.push(embed);
                embed = new MessageEmbed();
            }

            console.log(embeds)

            const Embeds = new PaginationEmbed.Embeds()
                .setArray(embeds)
                .setTitle(`Queue length: ${queue.links.length}`)
                .setColor('#ff3f35')
                .setFooter(`${client.user.username}™️ Bot v1.0.0 || Total Commands: ${client.commands.size}`, client.user.displayAvatarURL())
                .setAuthorizedUsers([message.author.id])
                .setChannel(message.channel)
                .setPageIndicator(false)
                .setDeleteOnTimeout(false)
                .setDisabledNavigationEmojis(['delete'])

            await Embeds.build();

        }


    }
}