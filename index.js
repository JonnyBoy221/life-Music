const Discord = require("discord.js");
const { config } = require("dotenv");
const fs = require("fs");
const { stripIndents } = require("common-tags");
let mongoose = require("mongoose");
const global = require("./global");


const client = new Discord.Client();

config({
    path: __dirname + "/.env"
});

mongoose.connect(encodeURI(process.env.DB_LINK), {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

client.categories = fs.readdirSync("./commands/");


["schemaLoader", "command"].forEach(async (handler) => {
    await require(`./handler/${handler}`)(client);
});

client.prefix = '$';


client.login(process.env.TOKEN);

client.on("ready", async () => {
    console.log(`I am online, my name is ${client.user.username}!`)
});





client.on("message", async message => {


    console.log(`${message.author.username} said: ${message.content}`);


    if (message.author.bot) return;
    




    let args = message.content.slice(client.prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();

    if (!message.content.startsWith(client.prefix)) return;







    if (cmd.length === 0) return;

    command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if (command) {

        command.run(client, message, args);
    }
})