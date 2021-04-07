const fs = require('fs')
const discord = require('discord.js')

class DiscordPoll {
    constructor() {
        this.discord = discord
        this.client = new discord.Client()
        this.collection = new discord.Collection()
        this.token = process.env.BOT_TOKEN
        this.prefix = process.env.BOT_PREFIX

        this.setCommand()
    }

    setCommand() {
        const commandFolds = fs.readdirSync('./BotCommands')
        for (const folder of commandFolds) {
            const commandFiles = fs.readdirSync(`./${folder}`.filter(file=>file.endsWith('.js')))
            for(const file of commandFiles) {
                const command = require(`./BotCommands/${file}`)
                this.client.commands.set(command.name, command)
            }
        }
    }

    sendMessage(message, channelId) {
        this.client.once('ready', () => {
            console.log(this.client.channels.cache)
            this.client.channels.cache.get(channelId).send(message)
        })
    }

    exec(message) {
        const args = this.getArgs(message)
        const command = args.shift().toLowerCase()

        if(!this.client.commands.has(command)) return

        try {
            client.commands.get(command).execute(message, args)
        } catch (err){
            console.log(err)
        }
    }

    getArg(message) {
        return message.content.slice(this.prefix.length).trim().split(' ')
    }

    login() {
        this.client.login(this.token)
    }

    makeEmbed(title, purpose) {
        var endPoll = new Date()
        endPoll.setDate(endPoll.getDate()+14)
        endPoll = endPoll.getDate() + "/" + endPoll.getMonth() + "/" + endPoll.getFullYear()
        var embed = new discord.MessageEmbed()
                                 .setTitle(title)
                                 .setDescription(purpose)
                                 .setThumbnail('https://www.memecreator.org/static/images/memes/4268033.jpg')
                                 .setFooter(`Ce vote se termine le ${endPoll}`)
        return embed
    }
}

module.exports = DiscordPoll
