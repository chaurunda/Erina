module.exports = (client) => {
    client.loadCommand = (commandName) => {
        try {
            const props = require(`../commands/${commandName}`);

            if (props.init) {
                props.init(client);
            }

            client.commands[props.help.name] = props;

            props.conf.aliases.forEach(alias => {
                client.aliases[alias] = props.help.name;
            });

            return false;
        } catch (e) {
            return `Unable to load command ${commandName}: ${e}`;
        }
    };
};
