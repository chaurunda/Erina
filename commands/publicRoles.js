exports.run = (client, message, args) => {
    message.channel.send(
        "Vous pouvez utiliser les commandes `" + client.config.prefix + "join` et `" + client.config.prefix + "remove` sur les groupes suivants :"
        + "\n\n"
        + "- `Overwatch`\n"
        + "- `AnimalCrossing`\n"
        + "- `Minecraft`\n"
        + "- `SeaOfThieves`\n"
        + "- `Elite`\n\n"
        + "- `Notifications`"
    );
};

exports.conf = {
    enabled: true,
    aliases: ['roles'],
    permLevel: "User"
};

exports.help = {
    name: "help",
    category: "Miscelaneous",
    description: "Liste l'ensemble des rôles publiques disponibles.",
    usage: "roles"
};
