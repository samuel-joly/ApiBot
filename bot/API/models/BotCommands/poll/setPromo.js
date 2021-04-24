const {PollMaker} = require('../../')
const purpose = "Réagissez pour obtenir le role de votre promos.\n**Ce vote se termine dans 30 secondes avec l'emote ❌**"
const pollName = "Choisissez un role"
const votesOption = ["Web 09/2019", "Web 06/2020", "Web 03/2021", "IA", "Sécurité"]
const pollArgs = {
    channel:process.env.BOT_CHANNEL,
    customEmojis: [
        "1⃣",
        "2⃣",
        "3⃣",
        "🤖",
        "🔐"
    ],
    event:{
        "onCollect": {
            "function":"setRoleAtVote",
            "args":["Web 09/2019", "Web 06/2020", "Web 03/2021", "IA", "Sécurité"]
        },
        "onRemove":{
            "function":"removeRoleAtUnvote",
            "args":["Web 09/2019", "Web 06/2020", "Web 03/2021", "IA", "Sécurité"]
        },
    },
    "noEndDisplay":true,
    "timer":30
}

module.exports = {
    name: 'setPromo',
    description:"Envoie le menus de sélection de promo",
    args:false,
    execute:(message) => {
        PollMaker(pollName, purpose, votesOption, pollArgs)
    }
}
