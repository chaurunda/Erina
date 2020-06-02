exports.run = (client, message, args) => {
    message.channel.send("Aucune commande n'est disponible pour le moment.");
};

exports.conf = {
    enabled: true,
    aliases: ['h', 'halp', 'needhealing'],
    permLevel: "User"
};

exports.help = {
    name: "help",
    category: "Miscelaneous",
    description: "Liste l'ensemble des commandes disponibles.",
    usage: "help"
};
