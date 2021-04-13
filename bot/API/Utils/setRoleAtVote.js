
async function setRoleAtVote(roles, message, reaction, allowedEmotes, user, removeAllWhenCreate = true) {

    let roleFilter = role => role.name == roles[allowedEmotes.indexOf(reaction.emoji.name)]
    const discordUser = await message.guild.members.fetch(user.id)
    //console.log('add',message.guild.roles.cache.find(roleFilter))

    console.log("=====",discordUser.roles.cache)
    if(!discordUser.roles.cache.some(roleFilter)){
        if(removeAllWhenCreate) {
            for(const role of roles) {
                await discordUser.roles.remove(discordUser.roles.cache.find(userRole => userRole.name == role)).catch(()=>{})
                //console.log("removed", role,"-----",discordUser.roles.cache.find(userRole => {console.log("~~~~",userRole.name == role); userRole.name == role}))
            }
        }
        await discordUser.roles.add(message.guild.roles.cache.find(roleFilter)).catch((e) => console.log("err add", e))
    }

}

//   collector.on('remove',async (reaction, user) => {
//       const roleFilter = role => role.name == roles[allowedEmotes.indexOf(reaction.emoji.name)]
//       const discordUser = await message.guild.members.fetch(user.id)
//       console.log('remove',message.guild.roles.cache.find(roleFilter).name)
//       await discordUser.roles.remove(discordUser.roles.cache.find(roleFilter)).catch((e) => console.log("err del", e))
//       console.log('dispose')
//   })

//if(user.roles.cache.some(roleFilter)){
//    console.log("removed")
//    await user.roles.remove(user.roles.cache.find(roleFilter))
//} else if(uniqueVote){
//    const filter = curRole => {roles.includes(curRole.name);}
//    const currRole = await user.roles.cache.find(filter)
//    if(currRole) {
//        console.log(`remove '${currRole.name}' and add current`)
//        await user.roles.remove(currRole)
//    }
//    console.log(`add`, roleName)
//    await user.roles.add(message.guild.roles.cache.find(roleFilter))
//}else{
//    await user.roles.add(el => el.name == roles[allowedEmotes.indexOf(reaction.emoji.name)])
//}

//const id = reaction.users.cache.find(usr => usr.id == user.id).id
//reaction.users.cache.find(usr => usr.id == user.id)
//.roles.add(roles[emotes.indexOf(reaction.emoji.name)])
//}

module.exports = setRoleAtVote
