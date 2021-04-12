const DiscordBot = require('./DiscordBot.js')

const PollMaker  = (pollName, pollDescription, fields, options = {}) => {
    const discordBot = new DiscordBot()
    const client = discordBot.client
    const voted = new Map()
    const allowedEmojis = options.customEmojis ??
          [
              '1⃣',
              '2⃣',
              '3⃣',
              '4⃣',
              '5⃣',
              '6⃣',
              '7⃣',
              '8⃣',
              '9⃣',
          ]
    let i = 0
    const listEmojis = []
    for(const field of fields) {
        listEmojis.push({name:`${allowedEmojis[i]} : ${field} `, value:"------"})
        i++
    }
    const poll = new discordBot.discord.MessageEmbed()
                               .setTitle(pollName)
                               .setDescription(pollDescription)
                               .addFields(...listEmojis)

    client.once('ready', () => {
        client.channels.cache.get(options.channel ?? process.env.BOT_CHANNEL).send(poll)
              .then((msg) => {
                  setReactionCollector(msg)
                  awaitReaction(msg)
              })
    })

    const setReactionCollector = async (msg) => {
        for(const field of allowedEmojis.slice(0,i)) {
            await msg.react(field)
        }
    }

    const awaitReaction = async (msg) => {
        const collector = msg.createReactionCollector(isEmoteAllowed,  {time: 10000})

        collector.on('collect', async (reaction, user)=>{
            if(voted[user.username] == undefined) {
                voted[user.username] = reaction.emoji.toString()
            } else {
                const oldReaction = msg.reactions.cache.filter(oldReaction => hasVotedFilter(oldReaction, user));
                await oldReaction.get(voted[user.username]).users.remove(user.id)
                voted[user.username] = reaction.emoji.toString()
            }
            options.onVote ? options.onVote(reaction, user) : null
        })

        collector.on('dispose', (user) => {
            voted.delete(user.username)
        })

        collector.on('end', collection => {
            options.onEnd ? options.onEnd(collection) : showResult(collection)
        })
    }

    const isEmoteAllowed = (reaction, user) => {
        return allowedEmojis.slice(0,i).includes(reaction.emoji.toString()) && !user.bot
    }

    const hasVotedFilter = (reaction, user) => {
        return reaction.users.cache.has(user.id) && reaction.emoji.name == voted[user.username]
    }

    const showResult = (collection) => {
        let results = []
        let j = 0
        for(const reaction of allowedEmojis.slice(0, i)) {
            if(collection.get(reaction) != undefined) {
                results.push({
                    name: `${listEmojis[j].name}`,
                    value: collection.get(reaction).count-1})
            }else{
                results.push({
                    name: `${listEmojis[j].name}`,
                    value: 0})
            }
            j += 1
        }
        const endPoll = new discordBot.discord.MessageEmbed()
                                      .setTitle(`Fin du vote ${pollName}`)
                                      .addFields(...results)
        client.channels.cache.get(options.channel ?? process.env.BOT_CHANNEL).send(endPoll)
    }
    discordBot.login()

}

module.exports = PollMaker
