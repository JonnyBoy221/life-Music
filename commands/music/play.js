let global = require("../../global");
const ytdl = require("ytdl-core");
const search = require("youtube-search");
const { MessageEmbed } = require("discord.js")
const { scrapePlaylist } = require("youtube-playlist-scraper");

let result;
let queue;
module.exports = {
    name: "play",
    aliases: ["pl"],
    category: "general",
    run: async (client, message, args) => {

        if (!args[0]) return message.channel.sned("You need to provide a youtube URL.")
        if (!ytdl.validateURL(args[0]) && !args[0].toLowerCase().includes('playlist?list=') && !args[0].toLowerCase().includes('&list=')) {
            queue = global.music.queue;


            result = await search(args.join(" "), { maxResults: 10, key: process.env.ytApiKey }).catch(err => console.log(err));

            for (var i in result.results) {
                result.results[i].title = result.results[i].title.replace(/&#39;/g, "'")
                result.results[i].title = result.results[i].title.replace(/&amp;/g || /&AMP;/g, "&")
            }



            if (result) {
                var i = 0;
                var titles = result.results.map(result => {
                    i++;
                    return `**${i}: **` + result.title;
                });

                let playmsg = message;


                const embed = new MessageEmbed()
                    .setColor('#ff3f35')
                    .setTitle("Select which song you want by typing the number")
                    .setDescription(`${titles.join("\n")}`)
                    .setFooter("Type the number within 20 seconds")

                let delembed = await message.channel.send(embed);

                filter = m => (m.author.id === message.author.id);
                let collected = await message.channel.awaitMessages(filter, { max: 1, time: 20000, errors: ['time'] })
                    .catch(timedout => message.reply(`Timed out.`) && delembed.delete() && playmsg.delete());
                if (!collected.first) return;
                var selected = result.results[collected.first().content - 1];

                delembed.delete();

                playmsg.delete();



                console.log(selected)

                if (!message.member.voice.channel) {

                    message.reply("Please join a voice channel");
                    return;

                } else {

                    message.reply("your song has been added to the queue!");
                    console.log(selected)
                    const embed = new MessageEmbed()
                        .setColor("#ff3f35")
                        .setTitle(`${selected.title}`)
                        .setURL(`${selected.link}`)
                        .setDescription(`${selected.description}`)
                        .setThumbnail(selected.thumbnails.high.url)
                        .setFooter(`Dualox Music™️ Bot v1.0.0 || Total Commands: ${client.commands.size}`, client.user.displayAvatarURL());


                    message.channel.send(embed);

                }

                queue.titles.push(selected.title);
                queue.links.push(selected.link);

                joinVc();
            }

            if (!message.member.voice.channel) {
                return message.reply("Please join a voice channel");

            }
        } else if(!args[0].toLowerCase().includes('playlist?list=') && !args[0].toLowerCase().includes('&list=')) {

            queue = global.music.queue;


            result = await search(args[0], { maxResults: 10, key: process.env.ytApiKey }).catch(err => console.log(err));
            var selected = result.results[0]

            if (!message.member.voice.channel) {

                message.reply("Please join a voice channel");
                return;

            } else {

                message.reply("your song has been added to the queue!");
                console.log(selected)
                const embed = new MessageEmbed()
                    .setColor("#ff3f35")
                    .setTitle(`${selected.title}`)
                    .setURL(`${selected.link}`)
                    .setDescription(`${selected.description}`)
                    .setThumbnail(selected.thumbnails.high.url)
                    .setFooter(`${client.user.username}™️ Bot v1.0.0 || Total Commands: ${client.commands.size}`, client.user.displayAvatarURL());


                message.channel.send(embed);

            }

            queue.titles.push(selected.title);
            queue.links.push(selected.link);

            joinVc();
        } else if(args[0].toLowerCase().includes('playlist?list=') || args[0].toLowerCase().includes('&list=')){
            queue = global.music.queue

            let playlistid = args[0].slice(args[0].indexOf('list=')+5, args[0].includes('&ab_channel=') ? args[0].indexOf('&ab_channel=') : undefined);
                
                console.log(playlistid);
                scrapePlaylist(playlistid).then(res => {
                    console.log(res);
                    res.playlist = res.playlist.filter(private => private.name != '[Privat video]' && private.name != '[Videoen er slettet]')
                    console.log(res)
                    
                    res.playlist.forEach(res2 => {
                        queue.links.push(res2.url);
                        queue.titles.push(res2.name);
                    })
                    joinVc();
                    embed = new MessageEmbed()
                        .setColor("#ff3f35")
                        .setTitle(`${res.title}`)
                        .setURL(`${args[0]}`)
                        .setAuthor(`added ${res.playlist.length} songs to the queue`)
                        //.setDescription(``)
                        .setFooter(`${client.user.username}™️ Bot v1.0.0 || Total Commands: ${client.commands.size}`, client.user.displayAvatarURL());


                    message.channel.send(embed);
                });


        }

        function joinVc() {
            if (!global.music.playing) message.member.voice.channel.join().then(function (connection) {

                console.log(queue)


                if (!global.music.title) { global.music.play(connection, message); }

                console.log('play')

            })
        }


        

    }
}