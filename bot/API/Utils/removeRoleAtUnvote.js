async function removeRoleAtUnvote(roles, message, reaction, allowedEmotes, user) {

    let roleFilter = role => role.name == roles[allowedEmotes.indexOf(reaction.emoji.name)]
    const discordUser = await message.guild.members.fetch(user.id)

    console.log(discordUser.roles.cache, roles[allowedEmotes.indexOf(reaction.emoji.name)])
    if(discordUser.roles.cache.some(roleFilter)){
        await discordUser.roles.remove(discordUser.roles.cache.find(roleFilter)).catch(()=>{})
    }
}

module.exports = removeRoleAtUnvote
