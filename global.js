module.exports = {

/**
 * Reads from the database
 *
 * @param {String} userId The user id of the user you want to read from
 * @param {String} guildId The guild id of the server you want to read from
 * @returns User data from the database
 */

    read: async (userId, guildId) => {
        const User = require("./mongoose/schemas/userSchema");
        user = await User.findOne({ userID: userId, guildID: guildId })
        return user
    },


/**
 * Writes to the database
 *
 * @param {String} user pass in the data you get from `global.read()`
 * @param {object} Data An Object of the data you want to change
 */

    write: async (user, Data) => {
        await user.updateOne(Data)
    },


    music: {
        title: "",
        link: "",
        servers: {dispatcher: null},
        queue: {titles: [], links: []},

        play: async function (connection, message) {
            let global = require("./global");
            let ytdl = require("ytdl-core");

            let server = global.music.servers;
            let queue = global.music.queue;
            server.dispatcher = connection.play(ytdl(queue.links[0], { filter: 'audioonly', quality: 'highestaudio', highWaterMark: 1 << 24 }), { highWaterMark: 1 });


            global.music.title = global.music.queue.titles[0];
            global.music.link = global.music.queue.links[0];

            global.music.queue.links.shift();
            global.music.queue.titles.shift();


            server.dispatcher.on("finish", function () {

                if (global.music.queue.links[0]) {
                    global.music.play(connection, message, ytdl);
                } else {
                    connection.disconnect();
                    message.channel.send(`Queue empty.`);
                    global.music.title = "";
                }



            });

        }
    
    }

}