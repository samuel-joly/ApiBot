exports.setRoleAtVote = async function setRoleAtVote(roles, message, reaction, allowedEmotes, user, removeAllWhenCreate = true) {
    let roleFilter = role => role.name == roles[allowedEmotes.indexOf(reaction.emoji.name)]
    const discordUser = await message.guild.members.fetch(user.id)

    if(!discordUser.roles.cache.some(roleFilter)){
        if(removeAllWhenCreate) {
            for(const role of roles) {
                await discordUser.roles.remove(discordUser.roles.cache.find(userRole => userRole.name == role)).catch(()=>{})
            }
        }
        console.log(message.guild.roles.cache.find(roleFilter))
        await discordUser.roles.add(message.guild.roles.cache.find(roleFilter)).catch((e) => console.log("err add", e))
    }

}

exports.removeRoleAtUnvote = async function removeRoleAtUnvote(roles, message, reaction, allowedEmotes, user) {
    let roleFilter = role => role.name == roles[allowedEmotes.indexOf(reaction.emoji.name)]
    const discordUser = await message.guild.members.fetch(user.id)

    await discordUser.roles.remove(message.channel.guild.roles.cache.find(roleFilter)).catch(()=>{console.log('removed', discordUser.roles.cache.find(roleFilter))})
}

exports.checkProp = function (req, requiredProp, maxLength = 0) {
    if(! req.hasOwnProperty('body')) return "No json body"
    var missingProperty = []
    for(prop of requiredProp) {
        if(!req.body.hasOwnProperty(prop)) {
            missingProperty.push(prop)
        }
    }

    if(missingProperty.length != 0) {
        return `Missing properties: ${missingProperty.join(' - ')}`
    }else {
        return true
    }
}
