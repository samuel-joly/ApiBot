//const fs = require('fs')
const discord = require('discord.js')

class DiscordBot {
    constructor() {
        this.discord = discord
        this.client = new discord.Client()
        this.collection = new discord.Collection()
        this.token = process.env.BOT_TOKEN
        this.prefix = process.env.BOT_PREFIX

        //this.setCommand()
    }

    login() {
        this.client.login(this.token)
    }

    setCommand() {
        const commandFolds = fs.readdirSync('./BotCommands')
        for (const folder of commandFolds) {
            const commandFiles = fs.readdirSync(`./${folder}`.filter(file=>file.endsWith('.js')))
            for(const file of commandFiles) {
                const command = require(`../BotCommands/${file}`)
                this.client.commands.set(command.name, command)
            }
        }
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

    sendMessage(message, channelId) {
        return this.client.once('ready', () => {
            this.client.channels.cache.get(channelId)
                .send(message)
        })
    }
}

module.exports = DiscordBot
