module.exports = {
    name: "reload",
    category: "music",
    description: "Reloads the specified command",
    run: async (client, message, args) => {

        if (message.author.id != "397030118515671040") return message.channel.send("Only my creator can do this command!")

        if (!args[0]) return message.channel.send("Please provide a command to reload!")

        let commandName = args[0].toLowerCase()

        try {
            delete require.cache[require.resolve(`./${commandName}.js`)] // usage !reload <name>
            client.commands.delete(commandName)
            let pull = require(`./${commandName}.js`)
            client.commands.set(commandName, pull)
            console.log(pull);
            if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => {
                console.log("Alias added")
                client.aliases.set(alias, pull.name);
            });

        } catch (e) {
            return message.channel.send(`Could not reload: \`${args[0]}.js\``)
        }

        message.channel.send(`\`${args[0]}.js\` has been reloaded!`)

    }
}