async function removeRoleAtUnvote(roles, message, reaction, allowedEmotes, user) {
    let roleFilter = role => role.name == roles[allowedEmotes.indexOf(reaction.emoji.name)]
    const discordUser = await message.guild.members.fetch(user.id)

    await discordUser.roles.remove(message.channel.guild.roles.cache.find(roleFilter)).catch(()=>{console.log('removed', discordUser.roles.cache.find(roleFilter))})
}

module.exports = removeRoleAtUnvote
