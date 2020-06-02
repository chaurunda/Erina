module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async run(packet) {
        if (!['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE'].includes(packet.t)) return;

        const channel = this.client.channels.get(packet.d.channel_id);

        if (channel.messages.has(packet.d.message_id)) return;

        await channel.fetchMessage(packet.d.message_id).then(message => {
            const emoji    = packet.d.emoji.id ? `${packet.d.emoji.name}:${packet.d.emoji.id}` : packet.d.emoji.name;
            const reaction = message.reactions.get(emoji);

            if (reaction) reaction.users.set(packet.d.user_id, this.client.users.get(packet.d.user_id));

            if (packet.t === 'MESSAGE_REACTION_ADD') {
                this.client.emit('messageReactionAdd', reaction, this.client.users.get(packet.d.user_id));
            }

            if (packet.t === 'MESSAGE_REACTION_REMOVE') {
                this.client.emit('messageReactionRemove', reaction, this.client.users.get(packet.d.user_id));
            }
        });
    }
};
