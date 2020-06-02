module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async run(message) {
        if (!message.content.startsWith(this.client.config.prefix) || message.author.bot) return;

        if (message.content.indexOf(this.client.config.prefix) !== 0) return;

        const args    = message.content.slice(this.client.config.prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();

        const cmd = this.client.commands[command] || this.client.commands[this.client.aliases[command]];

        if (!cmd) return;

        cmd.run(this.client, message, args);
    }
};
