exports.run = (client, message, args) => {
    let member         = message.guild.members.get(message.author.id);
    let availableRoles = ['Overwatch', 'AnimalCrossing', 'Minecraft', 'SeaOfThieves', 'Elite', 'Notifications'];
    let askedRole      = args.shift();

    if (!availableRoles.includes(askedRole)) return;

    let role = message.guild.roles.find(role => role.name === askedRole);

    if (!member.roles.has(role.id)) {
        member.addRole(role)
        message.channel.send("Accès autorisé " + member + ", vous faites maintenant parti du groupe `" + askedRole + "`.");
    } else {
        message.channel.send("Vous faites déjà parti du groupe `" + askedRole + "` " + member + ".");
    }
};

exports.conf = {
    enabled: true,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "join",
    category: "Miscelaneous",
    description: "Ajoute le rôle demandé s'il existe.",
    usage: "roles"
};
