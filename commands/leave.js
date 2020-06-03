exports.run = (client, message, args) => {
    let member         = message.guild.members.get(message.author.id);
    let availableRoles = ['Overwatch', 'AnimalCrossing', 'Minecraft', 'SeaOfThieves', 'Elite', 'Notifications'];
    let askedRole      = args.shift();

    if (!availableRoles.includes(askedRole)) return;

    let role = message.guild.roles.find(role => role.name === askedRole);

    if (member.roles.has(role.id)) {
        member.removeRole(role);
        message.channel.send("Accès révoqué " + member + ", vous ne faites plus parti du groupe `" + askedRole + "`.");
    } else {
        message.channel.send("Vous ne faites pas parti du groupe `" + askedRole + "` " + member + ".");
    }

    return;
};

exports.conf = {
    enabled: true,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "leave",
    category: "Miscelaneous",
    description: "Retire le rôle demandé s'il existe.",
    usage: "roles"
};
