async function setRoleAtVote(roles, message, reaction, allowedEmotes, user, removeAllWhenCreate = true) {
    let roleFilter = role => role.name == roles[allowedEmotes.indexOf(reaction.emoji.name)]
    const discordUser = await message.guild.members.fetch(user.id)

    if(!discordUser.roles.cache.some(roleFilter)){
        if(removeAllWhenCreate) {
            for(const role of roles) {
                await discordUser.roles.remove(discordUser.roles.cache.find(userRole => userRole.name == role)).catch(()=>{})
            }
        }
        await discordUser.roles.add(message.guild.roles.cache.find(roleFilter)).catch((e) => console.log("err add", e))
    }

}

module.exports = setRoleAtVote
