const DiscordBot = require('./API/models/DiscordBot.js')
const discord = new DiscordBot()

discord.client.on('message', message => {
    discord.exec(message)
})

discord.login()
